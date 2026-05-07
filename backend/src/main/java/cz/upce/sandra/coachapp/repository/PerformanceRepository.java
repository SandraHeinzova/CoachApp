package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Performance;
import cz.upce.sandra.coachapp.entity.PerformanceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, PerformanceId> {
}
