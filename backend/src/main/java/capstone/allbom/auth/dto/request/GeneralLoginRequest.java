package capstone.allbom.auth.dto.request;

import capstone.allbom.common.util.Validator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "일반 로그인 요청")
public record GeneralLoginRequest(
        @Schema(description = "아이디", example = "esssun")
        String loginId,
        @Schema(description = "비밀번호", example = "dmstjsdmstjs!")
        String loginPassword
) {
    public GeneralLoginRequest {
        Validator.notNull(loginId, "loginId");
        Validator.notNull(loginPassword, "loginPassword");
    }
}
