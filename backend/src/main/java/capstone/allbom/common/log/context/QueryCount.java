package capstone.allbom.common.log.context;

import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Getter
@RequestScope
@Component
public class QueryCount {

    private int count;

    public void increase() {
        ++count;
    }

}
