package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Parent;
import cz.upce.sandra.coachapp.repository.ParentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin

public class ParentController {

    private final ParentRepository parentRepository;

    public ParentController(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Parent> getAll() {
        return parentRepository.findAll();
    }
}
