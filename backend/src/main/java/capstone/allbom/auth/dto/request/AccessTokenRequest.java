package capstone.allbom.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

//@Schema(description = "인증 토큰 재발급 요청")
public record AccessTokenRequest(
//        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        @NotBlank(message = "인증 토큰은 빈 값이거나 null이 될 수 없습니다.")
        String accessToken
) {
}
