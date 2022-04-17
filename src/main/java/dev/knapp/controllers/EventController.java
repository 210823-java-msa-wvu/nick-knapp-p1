package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.databind.SerializationFeature;
import dev.knapp.models.Event;
import dev.knapp.services.EventService;
import dev.knapp.servlets.FrontControllerServlet;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

/*
 *
 * Endpoints:
<<<<<<< HEAD
 *  /books - (GET) retrieves all available books
 *        - (POST) adds a book -> want available only to admins?...
=======
 *  /events - (GET) retrieves all available events
 *         - (POST) adds an event
>>>>>>> nick_knapp
 *
 *  /books/{id} - (GET) gets a book by id
 *             - (PUT) updates a book -> want available only to admins?...
 *             - (DELETE) deletes a book -> want available only to admins?...
 *              - (PATCH) if you want to partially update a resource
 * */
public class EventController implements FrontController{

    private Logger log = LogManager.getLogger(FrontControllerServlet.class);

    private EventService eventService = new EventService();
    private ObjectMapper om = new ObjectMapper();


    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("Event Controller");
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

        om.setDateFormat(df);
        //om.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        if (path == null || path.equals("")) { // http://localhost:8080/Project1/events

            switch (request.getMethod()) {

                case "GET": {


                    System.out.println("Getting all events from the database...");
                    response.getWriter().write(om.writeValueAsString(eventService.getAllEvents()));
                    break;
                }

                case "POST": {
                    // then we would add the book (read from the request body) to the database
                    log.warn("POSTING NEW EVENT");

                    Event event = om.readValue(request.getReader(), Event.class);
                    eventService.createEvent(event);
                    //response.sendRedirect("static/request.html");
                    response.getWriter().write(om.writeValueAsString(event));
                    break;
                }

            }

        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int bookId = Integer.parseInt(path);
                /*if (bookId == 0){//to new event page
                    response.sendRedirect("static/newevent.html");
                    System.out.println("\nNEW EVENT RESPONSE SENT\n");
                }*/
            //else {
            Event event = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {
                    event = eventService.searchEventById(bookId);
                    if (event != null) {
                        response.getWriter().write(om.writeValueAsString(event.getDescription()));
                    } else {
                        response.sendError(404, "Event not found");
                    }
                    break;
                }

                case "PUT": {
                    event = om.readValue(request.getReader(), Event.class);
                    eventService.updateEvent(event);
                    break;
                }
                case "DELETE": {
                    eventService.deleteEvent(bookId);
                    break;
                }

                default: {
                    response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                    break;
                }

            }
            //}
        }

    }
}
