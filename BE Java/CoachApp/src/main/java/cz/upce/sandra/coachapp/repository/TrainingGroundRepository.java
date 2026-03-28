package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.TrainingGround;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingGroundRepository extends JpaRepository<TrainingGround,Long> {
}
