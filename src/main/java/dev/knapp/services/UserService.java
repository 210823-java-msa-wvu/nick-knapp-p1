package dev.knapp.services;

import dev.knapp.models.User;
import dev.knapp.repositories.UserRepo;

import java.util.List;

public class UserService {
    UserRepo userRepo = new UserRepo();

    public boolean login(String email, String password) {




        User u = userRepo.getByEmail(email); // more of the Sole Responsibility Principle at work

        // check to make sure User object is not null
        if (u != null) {
            // now check to make sure it matches
            if (email.equals(u.getEmail()) && password.equals(u.getPassword())) {
                return true;
            }
        }
        return false;
    }

    public List<User> getAllUsers() {

        return userRepo.getAll();

    }

    public User createUser(User u) {return userRepo.add(u);}

    public User searchUserById(Integer id) {
        return userRepo.getById(id);
    }


    public void updateUser(User u) {
        userRepo.update(u);
    }

    public void deleteUser(Integer id) {
        userRepo.delete(id);
    }



}
