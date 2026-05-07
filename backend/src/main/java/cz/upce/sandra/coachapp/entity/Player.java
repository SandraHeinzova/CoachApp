package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PLAYERS", schema = "SANDRA")
@PrimaryKeyJoinColumn(name = "member_ID")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Player extends TeamMember {

    @Column(name = "facr_id", nullable = false, unique = true)
    private String facrId;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "foot", nullable = false)
    private String foot;

    @Column(name = "is_healthy", nullable = false)
    private String isHealthy = "Yes";

    // --- VAZBY ---

    @ManyToOne
    @JoinColumn(name = "position_ID", nullable = false)
    private Position position;

    @ManyToMany
    @JoinTable(
            name = "PLAYERS_PARENTS",
            schema = "SANDRA",
            joinColumns = @JoinColumn(name = "PLAYER_member_ID"),
            inverseJoinColumns = @JoinColumn(name = "PARENT_parent_ID")
    )
    private java.util.Set<Parent> parents = new java.util.HashSet<>();
}