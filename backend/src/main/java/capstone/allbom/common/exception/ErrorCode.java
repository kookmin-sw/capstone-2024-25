package capstone.allbom.common.exception;

public enum ErrorCode {
    // 400
    INVALID_REQUEST_ARGUMENT("잘못된 요청입니다."),
    VALIDATION_FAIL("검증이 실패하였습니다."),
    NOT_FOUND_MEMBER_ID("요청한 ID에 해당하는 멤버가 존재하지 않습니다."),

    // 401
    EXPIRED_AUTH_TOKEN("만료된 로그인 토큰입니다."),
    INVALID_AUTH_TOKEN("올바르지 않은 로그인 토큰입니다."),
    NOT_BEARER_TOKEN_TYPE("Bearer 타입의 토큰이 아닙니다."),
    NEED_AUTH_TOKEN("로그인이 필요한 서비스입니다."),
    INCORRECT_PASSWORD_OR_ACCOUNT("비밀번호가 틀렸거나, 해당 계정이 없습니다."),
    DUPLICATE_ACCOUNT_USERNAME("해당 계정이 존재합니다."),

    // 403
    NOT_ENOUGH_PERMISSION("해당 권한이 없습니다."),

    // 429
    TOO_FREQUENT_REQUESTS("너무 잦은 요청입니다. 잠시 후 다시 시도해주세요."),

    // 500
    INTERNAL_SERVER_ERROR("서버 내부에 문제가 발생했습니다."),
    OAUTH2_PROVIDER_NOT_RESPONSE("OAuth2 제공자 서버에 문제가 발생했습니다."),
    FOR_TEST_ERROR("테스트용 에러입니다."),
    ;

    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
