package cz.upce.sandra.coachapp.controller;


import cz.upce.sandra.coachapp.entity.TrainingGround;
import cz.upce.sandra.coachapp.repository.TrainingGroundRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/grounds")
@CrossOrigin

public class TrainingGroundController {

    private final TrainingGroundRepository trainingGroundRepository;

    public TrainingGroundController(TrainingGroundRepository trainingGroundRepository) {
        this.trainingGroundRepository = trainingGroundRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<TrainingGround> getAllTrainingGrounds() {
        return trainingGroundRepository.findAll();
    }
}
