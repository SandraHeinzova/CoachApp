package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Match;
import cz.upce.sandra.coachapp.repository.MatchRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin

public class MatchController {

    private final MatchRepository matchRepository;

    public MatchController(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
}
