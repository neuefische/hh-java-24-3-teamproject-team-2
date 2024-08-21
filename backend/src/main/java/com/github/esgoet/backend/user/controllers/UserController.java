package com.github.esgoet.backend.user.controllers;

import com.github.esgoet.backend.user.dto.UserDto;
import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @PostMapping
    public User addUser(@RequestBody UserDto user) {
        return userService.saveUser(user);
    }


    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody UserDto user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
