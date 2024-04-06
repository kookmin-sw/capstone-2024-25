package capstone.allbom.auth.service.dto;

import capstone.allbom.common.jwt.TokenPayload;

public record TokenPayloadDto(
        TokenPayload accessTokenPayload,
        TokenPayload refreshTokenPayload
) {
}
