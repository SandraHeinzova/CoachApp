package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.City;
import cz.upce.sandra.coachapp.entity.Role;
import cz.upce.sandra.coachapp.entity.Position;
import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")

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
    public String register(@Valid @RequestBody UserRegistrationDto regDto) {
        String generatedPassword = userService.registerUser(regDto);
        return "Člen týmu byl úspěšně vytvořen. Heslo: " + generatedPassword;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(java.security.Principal principal) {
        try {
            String email = principal.getName();
            System.out.println("Spring Security úspěšně ověřil uživatele: " + email);

            UserDto user = userService.getUserByEmail(email);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.out.println("Chyba po úspěšném ověření: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Chyba při načítání profilu");
        }
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return userService.getAllRoles();
    }

    @GetMapping("/positions")
    public List<Position> getAllPositions() {
        return userService.getAllPositions();
    }

    @GetMapping("/cities")
    public List<City> getAllCities() {
        return userService.getAllCities();
    }
}
