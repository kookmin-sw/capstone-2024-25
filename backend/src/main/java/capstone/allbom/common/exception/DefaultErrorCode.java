package capstone.allbom.common.exception;

public enum DefaultErrorCode implements ErrorCode{
    // 400
    INVALID_REQUEST_ARGUMENT(400, "잘못된 요청입니다."),
    VALIDATION_FAIL(400, "검증이 실패하였습니다."),
    NOT_FOUND_MEMBER_ID(400, "요청한 ID에 해당하는 멤버가 존재하지 않습니다."),
    NOT_FOUND_MEDICINE_ID(400, "요청한 ID에 해당하는 약이 존재하지 않습니다."),
    NOT_FOUND_MAP_ID(400, "요청한 ID에 해당하는 지도 데이터가 존재하지 않습니다."),
    NOT_FOUND_JOB_ID(404, "요청한 ID에 해당하는 일자리 데이터가 존재하지 않습니다."),
    DUPLICATED_LOGIN_ID(400, "이미 존재하는 로그인 아이디입니다."),
    DUPLICATED_MEDICINE(400, "중복된 약입니다."),
    DUPLICATED_REGISTER(400, "이미 모든 회원가입을 완료했습니다."),
    INVALID_SECRET_KEY(400, "약한 키 예외가 발생했습니다."),
    INVALID_GET_OR_UPDATE_MEDICINE(400, "자신의 약만 조회 및 변경할 수 있습니다"),
    INVALID_MEDICINE_TIME(400, "유효하지 않은 약 시간입니다."),
    INVALID_ROUTINE_TYPE(404, "요청한 투두 카테고리에 해당하는 내용이 존재하지 않습니다."),
    INVALID_ROUTINE_NUMBER(404, "요청한 투두 카테고리의 번호에 해당하는 내용이 존재하지 않습니다."),
    INVALID_FACILITY_TYPE_ID(400, "요청한 유형과 번호에 해당하는 시설이 존재하지 않습니다."),
    INVALID_QUERY_PARAMETER_SORTED(400, "일자리 리스트 조회하기 위한 쿼리 파라미터 값으로 0과 1만 가능합니다."),
    INVALID_TWENTY_QUESTIONS_REQUEST(400, "새로운 스무고개 게임을 진행하려면 질문이 비어있어야 합니다."),
    NOT_FOUND_TWENTY_QUESTIONS(404, "스무고개 테이블이 존재하지 않습니다."),
    NEED_CHATBOT_PROFILE_UPDATE(400, "챗봇 프로필 업데이트가 먼저 필요합니다."),
    INVALID_GAME_SUBJECT_TYPE(404, "요청한 과목명이나 번호에 해당하는 문장이 존재하지 않습니다."),
    INVALID_GAME_SENTENCE_NUMBER(404, "요청한 번호에 해당하는 문장이 존재하지 않습니다."),
    INVALID_MEMBER_ADDRESS_PROVINCE(500, "요청한 주소를 시도로 변환하는 과정에서 문제가 발생했습니다."),
    COMPLETE_SUBJECT_ALL_PROBLEM(400, "해당 교과목의 모든 문제를 완료했습니다."),
    COMPLETE_ROUTINE_EXERCISE(400, "오늘의 운동을 완료했습니다."),
    COMPLETE_ROUTINE_GROWTH(400, "오늘의 성장을 완료했습니다."),
    COMPLETE_ROUTINE_HOBBY(400, "오늘의 취미를 완료했습니다."),
    COMPLETE_ROUTINE_REST(400, "오늘의 휴식을 완료했습니다."),
    COMPLETE_ROUTINE_EAT(400, "오늘의 식사를 완료했습니다."),
    COMPLETE_ALL_ROUTINE(400, "오늘의 모든 투두를 완료했습니다."),
    // 401
    EXPIRED_AUTH_TOKEN(401, "만료된 로그인 토큰입니다."),
    INVALID_AUTH_TOKEN(401, "올바르지 않은 로그인 토큰입니다."),
    NOT_BEARER_TOKEN_TYPE(401, "Bearer 타입의 토큰이 아닙니다."),
    NEED_AUTH_TOKEN(401,"로그인이 필요한 서비스입니다."),
    NEED_ADDITIONAL_REGISTRATION(401,"서비스를 이용하려면 추가 회원 정보 등록이 필요합니다."),
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
    INVALID_SOLVED_PROBLEMS_SIZE(500, "과목별 푼 문제를 계산하는 과정에서 서버에 문제가 발생했습니다."),
    UNEXPECTED_PROCESS_EXIT(500, "외부 파일 실행 도중 비정상적인 종료가 발생했습니다.")
    ;

    private final int code;
    private final String message;

    DefaultErrorCode(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
