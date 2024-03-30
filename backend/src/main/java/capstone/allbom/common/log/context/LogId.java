package capstone.allbom.common.log.context;

public interface LogId {

    static LogId from(final MemberIdHolder memberIdHolder) {
        if (memberIdHolder.getId() == -1L) {
            return new AnonymousLogId();
        }
        return new AuthenticatedLogId(memberIdHolder.getId());
    }

    String getId();

}
