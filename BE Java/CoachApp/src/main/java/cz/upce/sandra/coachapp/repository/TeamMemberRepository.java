package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    Optional<TeamMember> findByEmail(String email);
    Optional<TeamMember> findByUsername(String username);
}