package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.dto.LoginDto;
import cz.upce.sandra.coachapp.entity.City;
import cz.upce.sandra.coachapp.entity.Role;
import cz.upce.sandra.coachapp.entity.Position;
import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.repository.CityRepository;
import cz.upce.sandra.coachapp.repository.PositionRepository;
import cz.upce.sandra.coachapp.repository.RoleRepository;
import cz.upce.sandra.coachapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PositionRepository positionRepository;
    private final CityRepository cityRepository;

    public UserController(UserService userService, RoleRepository roleRepository, PositionRepository positionRepository,
                          CityRepository cityRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.positionRepository = positionRepository;
        this.cityRepository = cityRepository;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            System.out.println("Zkouším přihlásit: " + loginDto.email());
            UserDto user = userService.authenticate(loginDto.email(), loginDto.password());

            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/positions")
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    @GetMapping("/cities")
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
