package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.City;
import cz.upce.sandra.coachapp.entity.Role;
import cz.upce.sandra.coachapp.entity.Position;
import cz.upce.sandra.coachapp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/dictionaries")
public class DictionaryController {

    private final UserService userService;

    public DictionaryController(UserService userService) {
        this.userService = userService;
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