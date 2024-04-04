package capstone.allbom.common.exception;

public enum DefaultErrorCode implements ErrorCode{
    // 400
    INVALID_REQUEST_ARGUMENT(400, "잘못된 요청입니다."),
    VALIDATION_FAIL(400, "검증이 실패하였습니다."),
    NOT_FOUND_MEMBER_ID(400, "요청한 ID에 해당하는 멤버가 존재하지 않습니다."),
    NOT_FOUND_MEDICINE_ID(400, "요청한 ID에 해당하는 약이 존재하지 않습니다."),
    DUPLICATED_LOGIN_ID(400, "이미 존재하는 로그인 아이디입니다."),
    DUPLICATED_MEDICINE(400, "중복된 약입니다."),
    INVALID_SECRET_KEY(400, "약한 키 예외가 발생했습니다."),
    INVALID_UPDATE_MEDICINE(400, "자신의 약만 변경할 수 있습니다"),
    INVALID_GAME_SUBJECT_TYPE(400, "요청한 과목명이나 번호에 해당하는 문장이 존재하지 않습니다."),
    INVALID_GAME_SENTENCE_NUMBER(400, "요청한 번호에 해당하는 문장이 존재하지 않습니다."),
    // 401
    EXPIRED_AUTH_TOKEN(401, "만료된 로그인 토큰입니다."),
    INVALID_AUTH_TOKEN(401, "올바르지 않은 로그인 토큰입니다."),
    NOT_BEARER_TOKEN_TYPE(401, "Bearer 타입의 토큰이 아닙니다."),
    NEED_AUTH_TOKEN(401,"로그인이 필요한 서비스입니다."),
    INCORRECT_PASSWORD_OR_ACCOUNT(401, "비밀번호가 틀렸거나, 해당 계정이 없습니다."),
    DUPLICATE_ACCOUNT_USERNAME(401,"해당 계정이 존재합니다."),

    // 403
    NOT_ENOUGH_PERMISSION(403, "해당 권한이 없습니다."),

    // 404
    NOT_FOUND_GAME_SUBJECT(404, "요청한 gameId와 과목명에 해당하는 문장 순서 맞추기 카테고리가 존재하지 않습니다."),

    // 429
    TOO_FREQUENT_REQUESTS(429, "너무 잦은 요청입니다. 잠시 후 다시 시도해주세요."),

    // 500
    INTERNAL_SERVER_ERROR(500, "서버 내부에 문제가 발생했습니다."),
    OAUTH2_PROVIDER_NOT_RESPONSE(500, "OAuth2 제공자 서버에 문제가 발생했습니다."),
    FOR_TEST_ERROR(500, "테스트용 에러입니다."),
    ;

    private final int code;
    private final String message;

    DefaultErrorCode(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
