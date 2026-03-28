package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "TEAM_MEMBERS", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_member_seq")
    @SequenceGenerator(name = "team_member_seq", sequenceName = "SANDRA.TEAM_MEMBERS_member_ID_SEQ", allocationSize = 1)
    @Column(name = "member_ID")
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password_hash",  nullable = false)
    private String password;

    @Column(name = "name",  nullable = false)
    private String firstName;

    @Column(name = "last_name",  nullable = false)
    private String lastName;

    @Column(name = "date_of_birth",  nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "phone_number",  nullable = false,  unique = true)
    private String phoneNumber;

    @Column(name = "email",  nullable = false,   unique = true)
    private String email;

    @Column(name = "is_active",  nullable = false)
    private String isActive = "Yes";

    @ManyToOne
    @JoinColumn(name = "role_ID", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "city_ID", nullable = false)
    private City city;


}
