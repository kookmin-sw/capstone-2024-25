package capstone.allbom.auth.dto.request;

import capstone.allbom.common.util.Validator;
import lombok.Builder;

@Builder
public record GeneralLoginRequest(
        String loginId,
        String loginPassword
) {
    public GeneralLoginRequest {
        Validator.notNull(loginId, "loginId");
        Validator.notNull(loginPassword, "loginPassword");

    }
}
