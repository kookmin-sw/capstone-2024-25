package capstone.allbom.common.exception;

public class ValidException extends AllbomException {

    public ValidException(String message) {
        super(DefaultErrorCode.VALIDATION_FAIL, message);
    }
}