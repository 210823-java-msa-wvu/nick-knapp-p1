package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Reimbursement;
import dev.knapp.models.User;
import dev.knapp.services.ReimbursementService;
import dev.knapp.services.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MSRController implements FrontController{

    private ReimbursementService reService = new ReimbursementService();
    private ObjectMapper om = new ObjectMapper();
    private UserService userService = new UserService();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        System.out.println("\nentering MSR controller, fetching subordinate's reimbursements\n\n");
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        /*//using cookie, set path = user id
        Cookie[] thisUser=request.getCookies();//there should only be one cookie: user id
        //path = thisUser[0].getValue();
        String cookieValue = thisUser[0].getValue();
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
        Cookie[] thisUser=request.getCookies();//there should only be one cookie: user id
        //path = thisUser[0].getValue();
        int thisUserId = -1;

        for (Cookie coo : thisUser){
            if (coo.getName().equals("user_id")){
                thisUserId = Integer.parseInt(coo.getValue());
                System.out.println("user ID from cookies: " + thisUserId);
            }
        }

        //response.getWriter().write(om.writeValueAsString(userRes));
        //response.sendRedirect("static/mypastrequests.html");






        //no id at end of url
        if (path == null || path.equals("")) { // http://localhost:8080/Project1/request




            switch (request.getMethod()) {

                case "GET": {

                    response.sendRedirect("static/approverequests.html");
                    //System.out.println("Getting all reimbursements from the database...");
                    //response.getWriter().write(om.writeValueAsString(reService.getAllReimbursements()));

                    break;
                }

                case "POST": {
                    // then we would add the reimbursement request (read from the request body) to the database
                    Reimbursement r = om.readValue(request.getReader(), Reimbursement.class);
                    reService.createReimbursement(r);
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int userId = Integer.parseInt(path);//reimbursement ID at the end of the url?
            System.out.println("MSR controller; user ID from path: " + userId);
            Reimbursement r = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {//get all active reimbursement requests from subordinates

                    //for each user, get direct supervisor id, if user is supervisor, add to list of subordinates
                    List<User> allUsers = userService.getAllUsers();
                    ArrayList<User> subordinates = new ArrayList<User>();
                    ArrayList<Integer> subIds = new ArrayList<Integer>();
                    for(User u : allUsers){
                        int dsID = u.getDsId();
                        if (dsID == userId){
                            subordinates.add(u);
                            subIds.add(u.getUser_id());
                        }
                    }

                    for (Integer m: subIds){
                        System.out.println("sub ID: "+ m);
                    }

                    //for each subordinate,
                    //      get their active reimbursement requests
                    List<Reimbursement> allRRs = reService.getAllReimbursements();
                    ArrayList<Reimbursement> activeRRs = new ArrayList<Reimbursement>();
                    for (Reimbursement rr : allRRs){
                        for (Integer ID : subIds){
                            if (rr.getUserId() == ID){
                                if(rr.getStatus().equals("Needs direct supervisor approval")){
                                    activeRRs.add(rr);
                                }
                            }
                        }
                    }
                    for(Reimbursement rrr: activeRRs){
                        System.out.println("active RR user ID: "+ rrr.getUserId());
                    }
                    //send activeRRs back in response
                    System.out.println("\nReturning active RRs\n");
                    response.getWriter().write(om.writeValueAsString(activeRRs));



                    /*r = reService.searchReimbursementById(userId);
                    if (r != null) {
                        response.getWriter().write(om.writeValueAsString(r));//converts reimbursement to JSON

                        response.sendRedirect("static/mypastrequests.html");
                    } else {
                        response.sendError(404, "Reimbursement Request not found");
                    }*/
                    break;
                }

                case "PUT": {
                    r = om.readValue(request.getReader(), Reimbursement.class);
                    reService.updateReimbursement(r);
                    break;
                }
                case "DELETE": {
                    reService.deleteReimbursement(userId);
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
