package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CITIES", schema = "SANDRA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_seq")
    @SequenceGenerator(name = "city_seq", sequenceName = "SANDRA.CITIES_CITY_ID_SEQ", allocationSize = 1)
    @Column(name = "city_ID")
    private Long id;

    @Column(name = "NAME",  nullable = false, unique = true)
    private String name;
}