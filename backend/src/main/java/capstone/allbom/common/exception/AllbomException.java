package capstone.allbom.common.exception;

import org.springframework.core.NestedRuntimeException;

public abstract class AllbomException extends NestedRuntimeException {

    private final ErrorCode errorCode;

    protected AllbomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    protected AllbomException(ErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.errorCode = errorCode;
    }

    protected AllbomException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}