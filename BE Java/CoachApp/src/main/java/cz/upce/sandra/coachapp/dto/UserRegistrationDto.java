package cz.upce.sandra.coachapp.dto;

import java.time.LocalDate;

public record UserRegistrationDto(
        String firstName,
        String lastName,
        String email,
        String phone,           // Mobil
        LocalDate birthDate,    // Datum narození
        String facrId,          // FAČR ID
        Integer height,         // Výška
        Integer weight,         // Váha
        String foot,            // Noha (Pravá/Levá)
        Long roleId,            // Funkce v týmu (ID role z DB)
        Long cityId,            // Město (ID města)
        Long positionId         // Pozice (ID pozice - jen u hráčů)
) {}