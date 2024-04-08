package capstone.allbom.auth.dto.request;

import capstone.allbom.common.util.Validator;
import lombok.Builder;

@Builder
public record GeneralSignUpRequest(
        String loginId,
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
