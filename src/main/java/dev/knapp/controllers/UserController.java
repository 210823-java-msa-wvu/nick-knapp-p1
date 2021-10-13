package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Reimbursement;
import dev.knapp.models.User;
import dev.knapp.services.ReimbursementService;
import dev.knapp.services.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;



public class UserController implements FrontController{
    private ObjectMapper om = new ObjectMapper();
    private UserService userService = new UserService();



    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("\nentering USER controller\n\n");
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);


        Cookie[] thisUser=request.getCookies();//there should only be one cookie: user id
        //path = thisUser[0].getValue();
        int thisUserId = -1;
        if(thisUser != null) {
            for (Cookie coo : thisUser) {
                if (coo.getName().equals("user_id")) {
                    thisUserId = Integer.parseInt(coo.getValue());
                    System.out.println("user ID: " + thisUserId);
                }
            }
        }
        /*String cookieValue = thisUser[0].getValue();
        int intCookieValue = Integer.parseInt(cookieValue);

        System.out.println("cookie name: " + thisUser[0].getName());
        System.out.println("cookie value: " + cookieValue);*/


        /*if (thisUser != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("cookieName")) {
                    //do something
                    //value can be retrieved using #cookie.getValue()
                }
            }
        }*/








        //no id at end of url
        if (path == null || path.equals("")) { // http://localhost:8080/Project1/
            switch (request.getMethod()) {

                case "GET": {
                    //***  /Project1/pastrequests
                    //take cookie user id, get all requests for that user, return them in response
                    List<User>  allRes = userService.getAllUsers();
                    ArrayList<User> userRes = new ArrayList<User>();
                    System.out.println("requests of user " + thisUserId + ": ");
                    for (User re: allRes ){
                        if (re.getUser_id() == thisUserId){
                            userRes.add(re);

                        }
                    }//create exception for the case where user has no past reimbursement requests

                    //response.getWriter().write(om.writeValueAsString(userRes));
                    response.sendRedirect("static/mypastrequests.html");


                    //System.out.println("Getting all reimbursements from the database...");
                    //response.getWriter().write(om.writeValueAsString(reService.getAllReimbursements()));

                    break;
                }

                case "POST": {//for submitting reimbursements

                    //add the reimbursement request (read from the request body) to the database
                    User r = om.readValue(request.getReader(), User.class);
                    System.out.println("read the r");
                    userService.createUser(r);
                    System.out.println("posted r to DB");
                    response.getWriter().write(om.writeValueAsString(r));
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int reId = Integer.parseInt(path);//reimbursement ID at the end of the url?
            User u = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {
                    u = userService.searchUserById(reId);
                    User u2 = userService.searchUserById(thisUserId);
                    System.out.println(u);
                    System.out.println(u2);
                    if (u != null) {
                        response.getWriter().write(om.writeValueAsString(u));//converts user to JSON

                        //response.sendRedirect("static/mypastrequests.html");
                    } else {
                        response.sendError(404, "User not found");
                    }
                    break;
                }
                case "PUT": {
                    u = om.readValue(request.getReader(), User.class);
                    userService.updateUser(u);
                    break;
                }
                case "DELETE": {
                    userService.deleteUser(reId);
                    break;
                }
                default: {
                    response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                    break;
                }
            }
        }
    }



}
