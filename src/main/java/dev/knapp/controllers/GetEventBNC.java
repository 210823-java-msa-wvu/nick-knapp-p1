package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Event;
import dev.knapp.services.EventService;
import dev.knapp.servlets.FrontControllerServlet;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class GetEventBNC implements FrontController{

    private Logger log = LogManager.getLogger(FrontControllerServlet.class);
    private EventService eventService = new EventService();
    private ObjectMapper om = new ObjectMapper();



    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("Event By Name Controller");
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        if (path == null || path.equals("")) { // http://localhost:8080/Project1/events

            switch (request.getMethod()) {

                case "GET": {


                    System.out.println("Getting all events from the database...");
                    response.getWriter().write(om.writeValueAsString(eventService.getAllEvents()));
                    break;
                }

                case "POST": {
                    // then we would add the book (read from the request body) to the database
                    Event event = om.readValue(request.getReader(), Event.class);
                    eventService.createEvent(event);
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            //int bookId = Integer.parseInt(path);
                /*if (bookId == 0){//to new event page
                    response.sendRedirect("static/newevent.html");
                    System.out.println("\nNEW EVENT RESPONSE SENT\n");
                }*/
            //else {
            Event event = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {//should be the block to execute

                    log.warn("Getting event by name");
                    //in path, replace '%20' with " "
                    path = path.replaceAll("%20", " ");

                    List<Event> allEvents = eventService.getAllEvents();
                    for (Event ev: allEvents){
                        if(path.equals(ev.getDescription())){
                            System.out.println("sending Event info response");
                            response.getWriter().write(om.writeValueAsString(ev));
                        }
                    }
                    /*
                    event = eventService.searchEventById(bookId);
                    if (event != null) {
                        response.getWriter().write(om.writeValueAsString(event.getDescription()));
                    } else {
                        response.sendError(404, "Event not found");
                    }*/
                    break;
                }

                case "PUT": {
                    event = om.readValue(request.getReader(), Event.class);
                    eventService.updateEvent(event);
                    break;
                }
                case "DELETE": {
                    //eventService.deleteEvent(bookId);
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
