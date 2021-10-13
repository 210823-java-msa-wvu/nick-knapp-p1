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



        if (userService.login(username, password)) {

            //successful user log in: set user ID, login status, supervisor status cookies

            //get user ID
            User u = userService.searchUserByEmail(username);
            int userId = u.getUser_id();

            //get supervisor status
            String statusname = "supervisor";
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

            //check for past cookies
            Cookie[] pastC = request.getCookies();
            //boolean loginStatus = false;
            if(pastC != null) {//previous existing cookies
                for (Cookie c : pastC) {
                    System.out.println("cookie: " + c.getName() + " " + c.getValue());
                    if (c.getName().equals("loginStatus")) {
                        c.setValue("success");
                        //loginStatus = true;
                    } else if (c.getName().equals("supervisor")){
                        c.setValue(statusvalue);
                    } else if (c.getName().equals("user_id")){
                        c.setValue(String.valueOf(userId));
                    }
                    response.addCookie(c);

                }
            } else {
                Cookie cook = new Cookie("loginStatus","success");
                response.addCookie(cook);

                String name = "user_id";
                String value = String.valueOf(userId);
                Cookie cookie = new Cookie(name,value);
                response.addCookie(cookie);//pass user id in response as cookie

                //add supervisor status as cookie
                Cookie statuscookie = new Cookie(statusname, statusvalue);
                response.addCookie(statuscookie);
            }
            /*if (loginStatus == false){//no cookies
                Cookie cook = new Cookie("loginStatus","success");
                response.addCookie(cook);
            }*/





           /* if (pastC != null){
                for(Cookie c : pastC) {//deleting cookies either doesn't work or same cookies are generated right after
                    System.out.println("\nPAST COOKIE: " + c.getName() + " " + c.getValue());
                    System.out.println("deleting past cookie");
                    c.setValue("");
                    c.setPath("/");
                    c.setMaxAge(0);
                    //response.addCookie(c);
                }
            }*/


            // in cookies, set login status to succeeded
            //Cookie[] myCookies = Cookie.ge


            /*String name = "user_id";
            String value = String.valueOf(userId);
            Cookie cookie = new Cookie(name,value);
            response.addCookie(cookie);//pass user id in response as cookie

            //add supervisor status as cookie
            Cookie statuscookie = new Cookie(statusname, statusvalue);
            response.addCookie(statuscookie);*/

            response.sendRedirect("static/request.html");
        } else {
            //search cookies, set login status to failed, or add new
            //check for past cookies
            Cookie[] cooks = request.getCookies();
            //boolean loginStatus = false;
            if(cooks != null) {//previous existing cookies
                for (Cookie c : cooks) {
                    System.out.println("cookie: " + c.getName() + " " + c.getValue());
                    if (c.getName().equals("loginStatus")) {
                        c.setValue("failed");
                        //loginStatus = true;
                    }
                    //System.out.println("new value: " + c.getValue());
                    response.addCookie(c);
                    /*else if (c.getName().equals("supervisor")){
                        c.setValue("na");
                    } else if (c.getName().equals("user_id")){
                        c.setValue("na");
                    }*/
                }
            } else {
                Cookie failed = new Cookie("loginStatus","failed");
                response.addCookie(failed);
            }


            //handle this
            //respond with something. In login(): if something, reset forms and print message to screen
            //System.out.println("\ninvalid login");
            //int myInt = -1;
            //response.setStatus(myInt);
            //Cookie failedLogin = new Cookie("loginStatus", "failed");
            //response.addCookie(failedLogin);


            response.sendRedirect("static/index.html");

            //response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid login credentials");
        }
    }
}
