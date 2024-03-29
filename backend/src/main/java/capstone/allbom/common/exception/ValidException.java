package capstone.allbom.common.exception;

public class ValidException extends AllbomException {

    public ValidException(String message) {
        super(ErrorCode.VALIDATION_FAIL, message);
    }
}