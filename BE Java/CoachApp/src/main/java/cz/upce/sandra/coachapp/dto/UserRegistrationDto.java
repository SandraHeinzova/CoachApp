package cz.upce.sandra.coachapp.dto;
import jakarta.validation.constraints.*;


import java.time.LocalDate;

public record UserRegistrationDto(
        @NotBlank(message = "Jméno je povinné") String firstName,
        @NotBlank(message = "Příjmení je povinné") String lastName,
        @Email(message = "Neplatný formát emailu") String email,
        String phone,           // Mobil
        LocalDate birthDate,    // Datum narození
        String facrId,          // FAČR ID
        Integer height,         // Výška
        Integer weight,         // Váha
        String foot,            // Noha (Pravá/Levá)
        @NotNull Long roleId,            // Funkce v týmu (ID role z DB)
        @NotNull Long cityId,            // Město (ID města)
        Long positionId         // Pozice (ID pozice - jen u hráčů)
) {}

