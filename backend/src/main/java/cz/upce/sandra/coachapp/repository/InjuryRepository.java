package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Injury;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InjuryRepository extends JpaRepository<Injury, Long> {
}
