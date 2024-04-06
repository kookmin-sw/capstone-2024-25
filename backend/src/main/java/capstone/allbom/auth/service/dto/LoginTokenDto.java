package capstone.allbom.auth.service.dto;

public record LoginTokenDto(
        String accessToken,
        String refreshToken,
        boolean hasEssentialInfo
) {
}
