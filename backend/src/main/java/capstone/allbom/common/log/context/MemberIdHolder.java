package capstone.allbom.common.log.context;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Getter
@RequestScope
@Component
public class MemberIdHolder {

    @Setter
    private Long id = -1L;

}
