package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Player;
import cz.upce.sandra.coachapp.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByFacrId(String FacrId);

}
