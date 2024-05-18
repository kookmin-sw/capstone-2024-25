package capstone.allbom.member.exception;

import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.ErrorCode;

public enum MemberErrorCode implements ErrorCode {
    NON_EXISTENT_MEMBER(404, "해당 회원이 존재하지 않습니다.");
    private final int code;
    private final String message;

    MemberErrorCode(final int code, final String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
