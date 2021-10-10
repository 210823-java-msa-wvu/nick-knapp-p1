package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Reimbursement;
import dev.knapp.services.DepartmentService;
import dev.knapp.services.ReimbursementService;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementController implements FrontController{

    private ReimbursementService reService = new ReimbursementService();
    private ObjectMapper om = new ObjectMapper();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        System.out.println("\nentering reimbursement controller\n\n");
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);


        Cookie[] thisUser=request.getCookies();//there should only be one cookie: user id
        //path = thisUser[0].getValue();
        int thisUserId = -1;

        for (Cookie coo : thisUser){
            if (coo.getName().equals("user_id")){
                thisUserId = Integer.parseInt(coo.getValue());
                System.out.println("user ID: " + thisUserId);
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
                    List<Reimbursement>  allRes = reService.getAllReimbursements();
                    ArrayList<Reimbursement> userRes = new ArrayList<Reimbursement>();
                    System.out.println("requests of user " + thisUserId + ": ");
                    for (Reimbursement re: allRes ){
                        if (re.getUserId() == thisUserId){
                            userRes.add(re);
                            System.out.println("event id" + re.getEventId());
                        }
                    }//create exception for the case where user has no past reimbursement requests

                    //response.getWriter().write(om.writeValueAsString(userRes));
                    response.sendRedirect("static/mypastrequests.html");


                    //System.out.println("Getting all reimbursements from the database...");
                    //response.getWriter().write(om.writeValueAsString(reService.getAllReimbursements()));

                    break;
                }

                case "POST": {//for submitting reimbursements


                    // then we would add the reimbursement request (read from the request body) to the database
                    Reimbursement r = om.readValue(request.getReader(), Reimbursement.class);
                    reService.createReimbursement(r);
                    System.out.println("creating new reimbursement request");
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int reId = Integer.parseInt(path);//reimbursement ID at the end of the url?
            Reimbursement r = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {
                    r = reService.searchReimbursementById(reId);
                    if (r != null) {
                        response.getWriter().write(om.writeValueAsString(r));//converts reimbursement to JSON

                        response.sendRedirect("static/mypastrequests.html");
                    } else {
                        response.sendError(404, "Reimbursement Request not found");
                    }
                    break;
                }

                case "PUT": {
                    r = om.readValue(request.getReader(), Reimbursement.class);
                    reService.updateReimbursement(r);
                    break;
                }
                case "DELETE": {
                    reService.deleteReimbursement(reId);
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
