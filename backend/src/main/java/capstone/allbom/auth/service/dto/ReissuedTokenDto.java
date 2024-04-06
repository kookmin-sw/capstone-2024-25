package capstone.allbom.auth.service.dto;

public record ReissuedTokenDto(
        String accessToken,
        String refreshToken
) {
}
