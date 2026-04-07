package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.PhysicalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalTypeRepository extends JpaRepository<PhysicalType, Long> {
}
