package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Activity;
import cz.upce.sandra.coachapp.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin

public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}
