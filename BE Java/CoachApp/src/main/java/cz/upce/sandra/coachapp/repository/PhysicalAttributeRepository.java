package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.PhysicalAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhysicalAttributeRepository extends JpaRepository<PhysicalAttribute, Long> {
}