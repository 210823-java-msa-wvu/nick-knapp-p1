package dev.knapp.servlets;

import dev.knapp.controllers.FrontController;
import org.apache.catalina.servlets.DefaultServlet;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FrontControllerServlet extends DefaultServlet {

    private Logger log = LogManager.getLogger(FrontControllerServlet.class);
    private RequestHandler rh = new RequestHandler();

    // all requests are sent here
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //System.out.println("Front Controller Servlet process() is executing.");
        // first check if trying to access static resources
        String uriNoContext = request.getRequestURI().substring(request.getContextPath().length());
        log.trace(uriNoContext);

        if (uriNoContext.startsWith("/static")) {
            log.trace("Accessing static resources and trying to forward....");
            super.doGet(request, response);
        } else {
            // We want to 'get' the correct servlet based on the uri
            log.trace("Not static...Getting the appropriate controller...");
            FrontController fc = rh.handle(request, response);

            // check first to make sure it's not null
            if (fc != null) {
                log.trace("Processing request...");
                fc.process(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            }
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        process(req, resp);
    }
}
