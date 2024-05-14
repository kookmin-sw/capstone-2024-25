package capstone.allbom.common.exception;

public class InternalServerError extends AllbomException {

    public InternalServerError(ErrorCode errorCode) {
        super(errorCode);
    }
}