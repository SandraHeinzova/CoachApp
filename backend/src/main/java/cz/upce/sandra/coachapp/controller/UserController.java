package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.dto.UserUpdateDto;
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
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationDto regDto) {
        try {
            String generatedPassword = userService.registerUser(regDto);
            return ResponseEntity.ok("Člen týmu byl úspěšně vytvořen. Heslo: " + generatedPassword);
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

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        try {
            userService.deactivateUser(id);
            return ResponseEntity.ok("Člen byl deaktivován.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Chyba při deaktivaci: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDto dto) {
        try {
            userService.updateUser(id, dto);
            return ResponseEntity.ok("Údaje byly úspěšně aktualizovány.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Chyba při aktualizaci: " + e.getMessage());
        }
    }

}
