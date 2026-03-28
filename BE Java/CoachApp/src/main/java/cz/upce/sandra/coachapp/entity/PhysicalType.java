package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PHYSICAL_TYPES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PhysicalType {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "physical_type_seq")
    @SequenceGenerator(name = "physical_type_seq", sequenceName = "SANDRA.PHYSICAL_TYPES_physical_type_I", allocationSize = 1)
    @Column(name = "PHYSICAL_TYPE_ID")
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    private String name;

    @Column(name = "UNIT", nullable = false)
    private String unit;
}
