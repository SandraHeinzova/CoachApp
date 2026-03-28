package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Training;
import cz.upce.sandra.coachapp.repository.TrainingRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/trainings")
@CrossOrigin

public class TrainingController {

    private final TrainingRepository trainingRepository;

    public TrainingController(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }
}
