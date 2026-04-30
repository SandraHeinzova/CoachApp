package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.service.UserService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin

public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationDto regDto) {
        try {
            String generatedPassword = userService.registerUser(regDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Člen týmu byl úspěšně vytvořen. Heslo: " + generatedPassword);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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
}
