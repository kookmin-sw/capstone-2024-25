package capstone.allbom.common.exception;

public class BadRequestException extends AllbomException {

    public BadRequestException(ErrorCode errorCode) {
        super(errorCode);
    }
}
