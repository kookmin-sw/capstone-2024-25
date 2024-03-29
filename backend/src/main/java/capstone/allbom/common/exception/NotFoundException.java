package capstone.allbom.common.exception;

public class NotFoundException extends AllbomException{

    public NotFoundException(DefaultErrorCode errorCode) {
        super(errorCode);
    }
}
