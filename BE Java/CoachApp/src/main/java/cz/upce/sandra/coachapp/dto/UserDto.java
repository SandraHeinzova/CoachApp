package cz.upce.sandra.coachapp.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class UserDto {
    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String cityName;
    private final String email;
    private final String roleName;
    private final String phoneNumber;
    private final String facrId;
    private final Integer weight;
    private final Integer height;
    private final String foot;
    private final String positionName;
    private final java.time.LocalDate dateOfBirth;
}