package cz.upce.sandra.coachapp.dto;

// Record je super, protože sám vygeneruje konstruktor, gettery i toString!
public record LoginDto(
        String email,
        String password
) {
}