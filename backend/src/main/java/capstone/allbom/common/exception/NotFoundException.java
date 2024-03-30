package capstone.allbom.common.exception;

public class NotFoundException extends AllbomException{

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
