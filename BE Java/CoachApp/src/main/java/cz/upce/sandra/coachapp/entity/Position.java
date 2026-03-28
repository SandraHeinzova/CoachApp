package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "POSITIONS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "position_seq")
    @SequenceGenerator(name = "position_seq", sequenceName = "SANDRA.POSITIONS_position_ID_SEQ", allocationSize = 1)
    @Column(name = "position_ID")
    private Long id;

    @Column(name = "NAME",  nullable = false, unique = true)
    private String name;
}
