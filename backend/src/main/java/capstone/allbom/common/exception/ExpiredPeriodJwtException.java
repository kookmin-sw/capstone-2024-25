package capstone.allbom.common.exception;

public class ExpiredPeriodJwtException extends AllbomException{
    public ExpiredPeriodJwtException(ErrorCode errorCode) {
        super(errorCode);
    }
}
