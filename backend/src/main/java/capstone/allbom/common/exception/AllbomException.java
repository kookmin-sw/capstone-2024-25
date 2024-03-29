package capstone.allbom.common.exception;

import org.springframework.core.NestedRuntimeException;

public abstract class AllbomException extends NestedRuntimeException {

    private final DefaultErrorCode errorCode;

    protected AllbomException(DefaultErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    protected AllbomException(DefaultErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.errorCode = errorCode;
    }

    protected AllbomException(DefaultErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public DefaultErrorCode getErrorCode() {
        return errorCode;
    }
}