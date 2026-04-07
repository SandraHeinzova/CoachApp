package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Player;
import cz.upce.sandra.coachapp.repository.PlayerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin

public class PlayerController {

    private final PlayerRepository playerRepository;

    public PlayerController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }
}
