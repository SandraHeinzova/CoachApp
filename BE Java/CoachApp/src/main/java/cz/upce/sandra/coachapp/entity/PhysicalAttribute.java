package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "PHYSICAL_ATTRIBUTES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PhysicalAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "physical_attribute_seq")
    @SequenceGenerator(name = "physical_attribute_seq", sequenceName = "SANDRA.PHYSICAL_ATTRIBUTES_physical_a", allocationSize = 1)
    @Column(name = "PHYSICAL_ATTRIBUTE_ID")
    private Long id;

    @Column(name = "TEST_DATE",  nullable = false)
    private LocalDate testDate;

    @Column(name = "VALUE", nullable = false)
    private Integer value;

    @ManyToOne
    @JoinColumn(name = "PLAYER_MEMBER_ID")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "PHYSICAL_TYPE_ID")
    private PhysicalType physicalType;
}
