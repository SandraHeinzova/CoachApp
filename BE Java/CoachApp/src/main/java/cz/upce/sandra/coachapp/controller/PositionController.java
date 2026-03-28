package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Position;
import cz.upce.sandra.coachapp.repository.PositionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/positions")
@CrossOrigin

public class PositionController {

    private final PositionRepository positionRepository;

    public PositionController(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }
}
