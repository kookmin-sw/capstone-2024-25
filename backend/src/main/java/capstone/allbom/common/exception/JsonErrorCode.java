package capstone.allbom.common.exception;

public enum JsonErrorCode implements ErrorCode{

    UNEXPECTED_EXCEPTION(2000, "예상치 못한 Json관련 문제가 발생했습니다.");

    private final int code;
    private final String message;

    JsonErrorCode(final int code, final String message) {
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


