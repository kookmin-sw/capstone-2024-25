package capstone.allbom.auth.dto.response;

//@Schema(description = "로그인 응답")
public record LoginResponse(
//        @Schema(description = "인증 토큰", example = "abc.def.ghi")
        String accessToken,

//        @Schema(description = "성별, 생년월일, 주소, 약 정보를 가지고 있는지 여부", example = "true")
        boolean hasEssentialInfo
) {
}