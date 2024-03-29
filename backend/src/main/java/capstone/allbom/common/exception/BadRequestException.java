package capstone.allbom.common.exception;

public class BadRequestException extends AllbomException {

    public BadRequestException(DefaultErrorCode errorCode) {
        super(errorCode);
    }
}
