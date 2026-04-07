package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "INJURIES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Injury {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "injury_seq")
    @SequenceGenerator(name = "injury_seq", sequenceName = "SANDRA.INJURIES_injury_ID_SEQ", allocationSize = 1)
    @Column(name = "INJURY_ID")
    private Long id;

    @Column(name = "DATE_FROM", nullable = false)
    private LocalDate dateFrom;

    @Column(name = "DATE_TO")
    private LocalDate dateTo;

    @Column(name = "REASON", nullable = false)
    private String reason;

    @ManyToOne
    @JoinColumn(name = "PLAYER_member_ID")
    private Player player;
}
