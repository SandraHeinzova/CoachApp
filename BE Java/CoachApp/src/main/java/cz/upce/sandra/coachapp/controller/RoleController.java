package cz.upce.sandra.coachapp.controller;

import cz.upce.sandra.coachapp.entity.Role;
import cz.upce.sandra.coachapp.repository.RoleRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin

public class RoleController {
    
    private final RoleRepository roleRepository;
    
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    
    @GetMapping
    // TODO: Refactor to Service/DTO layer
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
