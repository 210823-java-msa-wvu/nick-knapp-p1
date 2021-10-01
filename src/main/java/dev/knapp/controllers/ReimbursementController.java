package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Reimbursement;
import dev.knapp.services.DepartmentService;
import dev.knapp.services.ReimbursementService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ReimbursementController implements FrontController{

    private ReimbursementService reService = new ReimbursementService();
    private ObjectMapper om = new ObjectMapper();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        if (path == null || path.equals("")) { // http://localhost:8080/Project1/reimb

            switch (request.getMethod()) {

                case "GET": {
                    System.out.println("Getting all books from the database...");
                    response.getWriter().write(om.writeValueAsString(reService.getAllReimbursements()));
                    break;
                }

                case "POST": {
                    // then we would add the book (read from the request body) to the database
                    Reimbursement r = om.readValue(request.getReader(), Reimbursement.class);
                    reService.createReimbursement(r);
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int bookId = Integer.parseInt(path);
            Reimbursement r = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {
                    r = reService.searchReimbursementById(bookId);
                    if (r != null) {
                        response.getWriter().write(om.writeValueAsString(r));
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
                    reService.deleteReimbursement(bookId);
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