package capstone.allbom.common.jwt;

public record TokenPayload(
        Long memberId,
        Long iat,
        Long exp
) {
}
