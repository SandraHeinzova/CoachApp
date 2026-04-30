package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin

public class AuthController {

    // Vytvoření loggeru pro tuto konkrétní třídu
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationDto regDto) {
        try {
            String generatedPassword = userService.registerUser(regDto);
            log.info("Nové heslo pro uživatele {}: {}", regDto.email(), generatedPassword);

            return ResponseEntity.status(HttpStatus.CREATED).body("Člen týmu byl úspěšně vytvořen. Přihlašovací údaje byly zaslány na e-mail.");
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "VALIDATION_FAILED");
            errorResponse.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(java.security.Principal principal) {
        try {
            String email = principal.getName();

            // I tady můžeš staré System.out.println nahradit profi logem
            log.info("Spring Security úspěšně ověřil uživatele: {}", email);

            UserDto user = userService.getUserByEmail(email);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "INTERNAL_SERVER_ERROR");
            errorResponse.put("message", "Chyba při načítání profilu");

            log.error("Chyba po úspěšném ověření: {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}