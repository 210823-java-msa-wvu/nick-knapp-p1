package dev.knapp.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.knapp.models.User;
import dev.knapp.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;



public class UserController implements FrontController{
    private ObjectMapper om = new ObjectMapper();
    private UserService userService = new UserService();


    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.getWriter().write(om.writeValueAsString(userService.getAllUsers()));


    }
}
