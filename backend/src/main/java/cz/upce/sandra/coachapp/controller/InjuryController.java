package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Injury;
import cz.upce.sandra.coachapp.repository.InjuryRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/injuries")
@CrossOrigin

public class InjuryController {

    private final InjuryRepository injuryRepository;

    public  InjuryController(InjuryRepository injuryRepository) {
        this.injuryRepository = injuryRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Injury> getAllInjuries() {
        return injuryRepository.findAll();
    }
}
