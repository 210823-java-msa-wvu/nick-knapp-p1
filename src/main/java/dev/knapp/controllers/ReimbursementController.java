package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Event;
import dev.knapp.models.Reimbursement;
import dev.knapp.models.User;
import dev.knapp.services.DepartmentService;
import dev.knapp.services.EventService;
import dev.knapp.services.ReimbursementService;
import dev.knapp.services.UserService;
import dev.knapp.servlets.FrontControllerServlet;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementController implements FrontController{

    private Logger log = LogManager.getLogger(ReimbursementController.class);
    private ReimbursementService reService = new ReimbursementService();
    private ObjectMapper om = new ObjectMapper();
    UserService userService = new UserService();
    EventService eventService = new EventService();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        log.warn("\nentering reimbursement controller\n\n");
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

                case "POST": {//for submitting reimbursement requests

                    //add the reimbursement request (read from the request body) to the database
                    Reimbursement r = om.readValue(request.getReader(), Reimbursement.class);
                    //int Rid = r.getRe_id();

                    //subtract amount from user's account
                    int thisEventId = r.getEventId();
                    Event thisEvent = eventService.searchEventById(thisEventId);
                    BigDecimal eventCost = thisEvent.getCost();
                    String eventType = thisEvent.getEventType();
                    Double coef  = 0.0;
                    System.out.println("\n\nEVENT TYPE: " + eventType + "\n\n");
                    if(eventType.equals("exam") || eventType.equals("Certification")){
                        coef = 1.0;
                    } else if (eventType.equals("Conference") || eventType.equals("Other")) {
                        coef = 0.3;
                    } else {
                        switch (eventType) {
                            case "University Course": {
                                System.out.println("univeritys course");
                                coef = 0.8;
                                break;
                            }
                            case "Seminar": {
                                System.out.println("seminar");
                                coef = 0.6;
                                break;
                            }
                            case "Certification Preparation Class": {
                                System.out.println("certification prep class");
                                coef = 0.75;
                                break;
                            }

                            case "Technical Training": {
                                coef = 0.9;
                                break;
                            }

                            default: {
                                log.warn("unknown event type");
                                break;

                            }
                        }
                    }
                    //System.out.println("coefficient: ");
                    //System.out.println(coef);
                    double d = eventCost.doubleValue();
                    int thisId = r.getUserId();
                    User aUser = userService.searchUserById(thisId);
                    BigDecimal avail = aUser.getAvailableReimbursement();
                    double d2 = avail.doubleValue();

                    double reimbursed = d * coef;
                    int myReimbursed = (int) Math.round(reimbursed);
                    int myAccount = (int) Math.round(d2);

                    int myNewAccount = myAccount - myReimbursed;
                    boolean over = false;
                    if (myNewAccount < 0){
                        myReimbursed = myAccount;
                        myNewAccount = 0;

                        over = true;
                    }
                    //System.out.println("my account " + myAccount);
                    //System.out.println("my reimbursed " + myReimbursed);
                    //System.out.println("\nmy new account: "+ myNewAccount);
                    aUser.setAvailableReimbursement(BigDecimal.valueOf(myNewAccount));
                    userService.updateUser(aUser);

                    //User bUser = userService.searchUserById(thisId);
                    //System.out.println("should match: " + bUser.getAvailableReimbursement());

                    r.setProjectedReimbursement(BigDecimal.valueOf(myReimbursed));
                            System.out.println("read the r");
                    reService.createReimbursement(r);
                    System.out.println("posted r to DB");

                    //update r based on requester funds
                    //Reimbursement r2 = reService.searchReimbursementById(Rid);

                    //reService.updateReimbursement(r2);
                    response.getWriter().write(om.writeValueAsString(r));

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
