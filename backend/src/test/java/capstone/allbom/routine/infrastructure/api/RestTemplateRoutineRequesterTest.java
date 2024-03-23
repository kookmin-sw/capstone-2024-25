package capstone.allbom.routine.infrastructure.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestTemplateRoutineRequesterTest {

    @Autowired
    private RestTemplateRoutineRequester restTemplateRoutineRequester;

    @Test
    public void 루틴_파일을_문자열로_변환한다() {
        String routineData = restTemplateRoutineRequester.requestRoutine();
        System.out.println("routineData = " + routineData);
    }

}