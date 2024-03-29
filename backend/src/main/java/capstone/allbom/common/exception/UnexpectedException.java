package capstone.allbom.common.exception;

public class UnexpectedException extends AllbomException {

    public UnexpectedException(String message) {
        super(ErrorCode.INTERNAL_SERVER_ERROR, message);
    }
}
