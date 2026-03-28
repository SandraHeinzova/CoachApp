package cz.upce.sandra.coachapp.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TRAININGS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Training {

    @Id
    @Column(name = "activity_ID")
    private Long id;

    @Column(name = "focus", nullable = false)
    private String focus;

    // --- VAZBY ---

    @ManyToOne
    @JoinColumn(name = "ground_ID", nullable = false)
    private TrainingGround trainingGround;

    @OneToOne
    @MapsId
    @JoinColumn(name = "activity_ID")
    private Activity activity;
}
