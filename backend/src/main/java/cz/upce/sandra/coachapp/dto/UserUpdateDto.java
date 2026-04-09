package cz.upce.sandra.coachapp.dto;

public record UserUpdateDto(
        String email,
        String phone,
        String cityName
) {}
