package cz.upce.sandra.coachapp.controller;


import cz.upce.sandra.coachapp.entity.Performance;
import cz.upce.sandra.coachapp.repository.PerformanceRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/performances")
@CrossOrigin


public class PerformanceController {

    private final PerformanceRepository performanceRepository;

    public PerformanceController(PerformanceRepository performanceRepository) {
        this.performanceRepository = performanceRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Performance> findAll() {
        return performanceRepository.findAll();
    }
}
