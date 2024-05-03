package capstone.allbom.auth.dto.request;

import capstone.allbom.common.util.Validator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "일반 회원가입 요청")
public record GeneralSignUpRequest(
        @Schema(description = "아이디", example = "esssun")
        String loginId,
        @Schema(description = "비밀번호", example = "dmstjsdmstjs!")
        String loginPassword
) {
    public GeneralSignUpRequest {
        Validator.notNull(loginId, "loginId");
        Validator.notNull(loginPassword, "loginPassword");
        Validator.minLength(loginId, 6, "loginId");
        Validator.maxLength(loginId, 12, "loginId");
        Validator.minLength(loginPassword, 8, "loginPassword");
        Validator.maxLength(loginPassword, 16, "loginPassword");
    }
}
