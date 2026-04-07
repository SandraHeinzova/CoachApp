package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.PhysicalAttribute;
import cz.upce.sandra.coachapp.repository.PhysicalAttributeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/physical-attributes")
@CrossOrigin
public class PhysicalAttributeController {

    private final PhysicalAttributeRepository physicalAttributeRepository;

    public PhysicalAttributeController(PhysicalAttributeRepository physicalAttributeRepository) {
        this.physicalAttributeRepository = physicalAttributeRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<PhysicalAttribute> getAllAttributes() {
        return physicalAttributeRepository.findAll();
    }
}