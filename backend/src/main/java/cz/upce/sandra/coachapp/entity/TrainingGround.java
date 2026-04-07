package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TRAINING_GROUNDS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TrainingGround {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "training_ground_seq")
    @SequenceGenerator(name = "training_ground_seq", sequenceName = "SANDRA.TRAINING_GROUNDS_ground_ID_SEQ", allocationSize = 1)
    @Column(name = "ground_ID")
    private Long id;

    @Column(name = "NAME",  nullable = false, unique = true)
    private String name;
}
