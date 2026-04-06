package cz.upce.sandra.coachapp.dto;
import jakarta.validation.constraints.*;


import java.time.LocalDate;

public record UserRegistrationDto(
        @NotBlank(message = "Jméno je povinné") String firstName,
        @NotBlank(message = "Příjmení je povinné") String lastName,
        @Email(message = "Neplatný formát emailu") String email,
        String phone,
        LocalDate birthDate,
        String facrId,
        Integer height,
        Integer weight,
        String foot,
        @NotNull Long roleId,
        Long cityId,
        String cityName,
        Long positionId
) {}

