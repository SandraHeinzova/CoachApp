package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    // Tohle přidáme - Spring sám vygeneruje SQL dotaz!
    Optional<Role> findByName(String name);
}