package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.Department;
import dev.knapp.services.DepartmentService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class DepartmentController implements FrontController{

        private DepartmentService deptService = new DepartmentService();
        private ObjectMapper om = new ObjectMapper();

        @Override
        public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {

            // Getting the attribute we set in the RequestHandler's handle() method
            String path = (String) request.getAttribute("path");
            System.out.println("Path attribute: " + path);

            if (path == null || path.equals("")) { // http://localhost:8080/LibraryServlet/books

                switch (request.getMethod()) {

                    case "GET": {
                        System.out.println("Getting all books from the database...");
                        response.getWriter().write(om.writeValueAsString(deptService.getAllDepartments()));
                        break;
                    }

                    case "POST": {
                        // then we would add the book (read from the request body) to the database
                        Department d = om.readValue(request.getReader(), Department.class);
                        deptService.createDepartment(d);
                        break;
                    }

                }


            } else {
                // Else -> there IS a path attribute that we need to use in our logic

                // save that attribute into an integer
                int bookId = Integer.parseInt(path);
                Department d = null;

                switch (request.getMethod()) {
                    // /books/1
                    case "GET": {
                        d = deptService.searchDepartmentById(bookId);
                        if (d != null) {
                            response.getWriter().write(om.writeValueAsString(d));
                        } else {
                            response.sendError(404, "Department not found");
                        }
                        break;
                    }

                    case "PUT": {
                        d = om.readValue(request.getReader(), Department.class);
                        deptService.updateDepartment(d);
                        break;
                    }
                    case "DELETE": {
                        deptService.deleteDepartment(bookId);
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
