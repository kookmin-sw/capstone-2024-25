package capstone.allbom.auth.dto.response;

//@Schema(description = "인증 토큰 재발급 응답")
public record ReissuedAccessTokenResponse(
//        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken
) {
}
