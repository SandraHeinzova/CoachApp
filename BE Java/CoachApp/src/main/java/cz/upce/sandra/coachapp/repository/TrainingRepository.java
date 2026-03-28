package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
}
