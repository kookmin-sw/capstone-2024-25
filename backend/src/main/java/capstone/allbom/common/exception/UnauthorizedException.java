package capstone.allbom.common.exception;

public class UnauthorizedException extends AllbomException {

    public UnauthorizedException(ErrorCode errorCode) {
        super(errorCode);
    }
}
