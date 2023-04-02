package com.project.db_setup.controllers;

import com.project.db_setup.entities.User;
import com.project.db_setup.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/users")
    public String getUserByName(@RequestParam String name) {
        User user = userRepository.findByName(name);
        return user.toString();
    }

}
