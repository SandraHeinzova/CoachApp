package cz.upce.sandra.coachapp.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class UserDto {
    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String roleName;
    private final String phoneNumber;
}