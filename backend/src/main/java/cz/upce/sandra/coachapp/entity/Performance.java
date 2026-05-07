package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PERFORMANCES", schema = "SANDRA")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Performance {

    @EmbeddedId
    private PerformanceId id;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "minutes_played", nullable = false)
    private Integer minutesPlayed;

    @Column(name = "goals_scored", nullable = false)
    private Integer goalsScored;

    @Column(name = "red_cards", nullable = false)
    private Integer redCards;

    @Column(name = "yellow_cards", nullable = false)
    private Integer yellowCards;

    @Column(name = "assists", nullable = false)
    private Integer assists;

    @Column(name = "evaluation", columnDefinition = "NUMBER(2,1)")
    private Double evaluation;

    @Column(name = "coach_note")
    private String coachNote;

    // --- VAZBY ---

    @ManyToOne
    @MapsId("playerId")
    @JoinColumn(name = "PLAYER_member_ID")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "activity_ID", nullable = false)
    private Activity activity;
}
