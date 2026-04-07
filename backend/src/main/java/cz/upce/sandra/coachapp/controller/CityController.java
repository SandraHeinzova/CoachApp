package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.City;
import cz.upce.sandra.coachapp.repository.CityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin

public class CityController {

    private final CityRepository cityRepository;

    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
