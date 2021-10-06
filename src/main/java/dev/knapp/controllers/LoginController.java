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
            String name = "user_id";
            String value = String.valueOf(userId);
            Cookie cookie = new Cookie(name,value);
            response.addCookie(cookie);//pass user id in response
            response.sendRedirect("static/request.html");
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid login credentials");
        }
    }
}
