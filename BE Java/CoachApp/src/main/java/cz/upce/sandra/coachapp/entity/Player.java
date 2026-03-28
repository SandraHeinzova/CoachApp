package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PLAYERS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Player {

    @Id
    @Column(name = "member_ID")
    private Long id;

    @Column(name = "facr_id", nullable = false, unique = true)
    private String facrId;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "foot", nullable = false)
    private String foot; // V SQL máš CHECK na 'Left', 'Right', 'Both'

    @Column(name = "is_healthy", nullable = false)
    private String isHealthy = "Yes";

    // --- VAZBY ---

    @OneToOne
    @MapsId // TOHLE JE TO KOUZLO: Spring vezme ID z TeamMember a dá ho sem jako PK
    @JoinColumn(name = "member_ID")
    private TeamMember teamMember;

    @ManyToOne
    @JoinColumn(name = "position_ID", nullable = false)
    private Position position;

    // Pro vazební tabulku PLAYERS-PARENTS
    @ManyToMany
    @JoinTable(
            name = "PLAYERS_PARENTS",
            schema = "SANDRA",
            joinColumns = @JoinColumn(name = "PLAYER_member_ID"),
            inverseJoinColumns = @JoinColumn(name = "PARENT_parent_ID")
    )
    private java.util.Set<Parent> parents = new java.util.HashSet<>();
}