package capstone.allbom.common.jwt;

import capstone.allbom.auth.exception.AuthErrorCode;
import capstone.allbom.common.exception.BadRequestException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class BearerAuthorizationExtractor {

    private static final String BEARER_TOKEN_PREFIX = "Bearer ";
    private static final String BLANK = " ";

    public String extractAccessToken(final String header) {
        if (StringUtils.hasText(header) && header.startsWith(BEARER_TOKEN_PREFIX)) {
            return header.split(header)[1];
        }
        throw new BadRequestException(AuthErrorCode.INVALID_TOKEN);
    }
}
