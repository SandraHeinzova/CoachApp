package cz.upce.sandra.coachapp.controller;


import cz.upce.sandra.coachapp.entity.PhysicalType;
import cz.upce.sandra.coachapp.repository.PhysicalTypeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/physical-types")
@CrossOrigin

public class PhysicalTypeController {

    private final PhysicalTypeRepository physicalTypeRepository;

    public PhysicalTypeController(PhysicalTypeRepository physicalTypeRepository) {
        this.physicalTypeRepository = physicalTypeRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<PhysicalType> getAll() {
        return physicalTypeRepository.findAll();
    }
}
