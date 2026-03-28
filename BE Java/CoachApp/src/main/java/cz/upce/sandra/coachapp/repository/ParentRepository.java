package cz.upce.sandra.coachapp.repository;

import cz.upce.sandra.coachapp.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
}
