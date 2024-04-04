package capstone.allbom.game.infrastructure.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestTemplateGameRequesterTest {

    @Autowired
    private RestTemplateGameRequester restTemplateGameRequester;

    @Test
    public void 문장_순서_맞추기_파일을_문자열로_변환한다() {
        String sentenceData = restTemplateGameRequester.requestGame();
        System.out.println("sentenceData = " + sentenceData);
    }

}