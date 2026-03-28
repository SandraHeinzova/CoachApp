package cz.upce.sandra.coachapp.controller;


import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public List<UserDto> getAllUsers() {

        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationDto regDto) {
        userService.registerUser(regDto);
        return "Člen týmu byl úspěšně vytvořen a heslo vygenerováno!";
    }
}
