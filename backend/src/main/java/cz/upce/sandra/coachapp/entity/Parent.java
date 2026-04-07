package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PARENTS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "parent_seq")
    @SequenceGenerator(name = "parent_seq", sequenceName = "SANDRA.PARENTS_parent_ID_SEQ", allocationSize = 1)
    @Column(name = "parent_ID")
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "PHONE_NUMBER", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
}
