package capstone.allbom.auth.dto.response;

import capstone.allbom.member.domain.Member;

public record GeneralSignUpResponse(
        Long id,
        String loginId
) {
    public GeneralSignUpResponse {
    }

    public static GeneralSignUpResponse from (Member member) {
        return new GeneralSignUpResponse(member.getId(), member.getLoginId());
    }
}
