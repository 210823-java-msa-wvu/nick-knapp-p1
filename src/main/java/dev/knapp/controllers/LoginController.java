package dev.knapp.controllers;

import dev.knapp.models.User;
import dev.knapp.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoginController implements FrontController {

    private Logger log = LogManager.getLogger(LoginController.class);
    private UserService userService = new UserService();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        //System.out.println("LoginController process() is executing.");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        //System.out.println("Username: " + username + " Password: " + password);

        //getting all the cookies
        //Cookie cookies[]=request.getCookies();//not necessary in login servlet; we already have the username

        //get userid from DB, send back as cookie

        User u = userService.searchUserByEmail(username);
        int userId = u.getUser_id();

        if (userService.login(username, password)) {

            String statusname = "isSupervisor";
            //check to see if user is supervisor
            String statusvalue = "false";
            if(u.isBenCo()){
                statusvalue = "true";
            } else {
                //for all employees, get supervisor.  If user is supervisor for at least one employee, set status to true
                List<User> myUsers = userService.getAllUsers();
                for (User user: myUsers){
                    int supervisorId = user.getDsId();
                    if (supervisorId == userId){
                        statusvalue = "true";
                    }
                }
            }

            Cookie[] pastC =request.getCookies();//there should only be one cookie: user id
            System.out.println("this is pastC: " + pastC);

            if (pastC != null){
                for(Cookie c : pastC) {//deleting cookies either doesn't work or same cookies are generated right after
                    System.out.println("\nPAST COOKIE: " + c.getName() + " " + c.getValue());
                    System.out.println("deleting past cookie");
                    c.setValue("");
                    c.setPath("/");
                    c.setMaxAge(0);
                    //response.addCookie(c);
                }
            }


            // in cookies, set login status to succeeded
            //Cookie[] myCookies = Cookie.ge
            String name = "user_id";
            String value = String.valueOf(userId);
            Cookie cookie = new Cookie(name,value);
            response.addCookie(cookie);//pass user id in response as cookie

            //add supervisor status as cookie
            Cookie statuscookie = new Cookie(statusname, statusvalue);
            response.addCookie(statuscookie);

            response.sendRedirect("static/request.html");
        } else {
            //handle this
            //respond with something. In login(): if something, reset forms and print message to screen
            System.out.println("\ninvalid login");
            //int myInt = -1;
            //response.setStatus(myInt);
            Cookie failedLogin = new Cookie("loginStatus", "failed");
            response.addCookie(failedLogin);
            response.sendRedirect("static/index.html");

            //response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid login credentials");
        }
    }
}
