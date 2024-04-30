package capstone.allbom.routine.infrastructure.api;

import capstone.allbom.routine.service.RoutineService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestTemplateRoutineRequesterTest {

    @Autowired
    private RestTemplateRoutineRequester restTemplateRoutineRequester;
    private RoutineService routineService;

    @Test
    public void 루틴_파일을_문자열로_변환한다() {
//        restTemplateRoutineRequester.requestRoutine();
      String routineData = restTemplateRoutineRequester.requestRoutine();
    }

    @Test
    public void JSON_필드를_랜덤으로_추출한다() {
//        restTemplateRoutineRequester.getRandomRoutineFields();
    }

}