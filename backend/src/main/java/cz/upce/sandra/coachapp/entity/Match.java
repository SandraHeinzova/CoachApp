package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MATCHES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Match {

    @Id
    @Column(name = "activity_ID")
    private Long id;

    @Column(name = "opponent_name", nullable = false)
    private String opponentName;

    @Column(name = "pregame_time", nullable = false)
    private Integer pregameTime;

    // --- VAZBY ---

    @OneToOne
    @MapsId
    @JoinColumn(name = "activity_ID")
    private Activity activity;
}
