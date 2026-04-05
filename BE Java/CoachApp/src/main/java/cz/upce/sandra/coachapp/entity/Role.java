package cz.upce.sandra.coachapp.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ROLES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq")
    @SequenceGenerator(name = "role_seq", sequenceName = "SANDRA.ROLES_role_id_SEQ", allocationSize = 1)
    @Column(name = "role_id")
    private Long id;

    @Column(name = "name")
    private String name;

    public boolean isNamed(String roleName) {
        return this.name != null && this.name.equalsIgnoreCase(roleName);
    }
}

