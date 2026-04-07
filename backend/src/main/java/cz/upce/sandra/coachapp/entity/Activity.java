package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ACTIVITIES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_seq")
    @SequenceGenerator(name = "activity_seq", sequenceName = "SANDRA.ACTIVITIES_activity_ID_SEQ", allocationSize = 1)
    @Column(name = "activity_ID")
    private Long id;

    @Column(name = "date_time", nullable = false)
    private java.time.LocalDateTime dateTime; // Použijeme LocalDateTime, protože obsahuje i čas

    @Column(name = "type", nullable = false)
    private String type; // 'Match' nebo 'Training'

    @ManyToOne
    @JoinColumn(name = "city_ID", nullable = false)
    private City city;
}