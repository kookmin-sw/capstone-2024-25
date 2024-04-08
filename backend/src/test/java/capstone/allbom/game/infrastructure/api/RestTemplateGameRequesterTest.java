package capstone.allbom.game.infrastructure.api;

import capstone.allbom.common.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static capstone.allbom.common.exception.DefaultErrorCode.*;
import static org.assertj.core.api.Assertions.assertThat;
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
    
    @Test
    public void 과목명과_문장_번호로_문장을_조회한다() {
        // when
        String legislationSentence = restTemplateGameRequester.getSentence("법률", "3");
        String historySentence = restTemplateGameRequester.getSentence("역사", "100");
        String scienceSentence = restTemplateGameRequester.getSentence("과학", "27");

        // then
        assertThat(legislationSentence).isEqualTo("형사피고인은 무죄추정의 원칙에 따라 유죄가 증명될 때까지는 무죄로 추정된다.");
        assertThat(historySentence).isEqualTo("한국은 인권과 민주주의를 중시하는 나라로 발전했다.");
        assertThat(scienceSentence).isEqualTo("전자 자기 공명 이미징은 분자의 구조와 성질을 연구하는 데 사용된다.");
    }

    @Test
    public void 존재하지_않는_과목명으로_문장을_조회한다() {
        // when
        BadRequestException e = assertThrows(BadRequestException.class, ()
                -> restTemplateGameRequester.getSentence("법률안", "3"));

        // then
        assertThat(e.getErrorCode()).isEqualTo(INVALID_GAME_SUBJECT_TYPE);
        assertThat(e.getMessage()).isEqualTo("요청한 과목명이나 번호에 해당하는 문장이 존재하지 않습니다.");
    }

    @Test
    public void 존재하지_않는_번호로_문장을_조회한다() {
        // when
        BadRequestException e = assertThrows(BadRequestException.class, ()
                -> restTemplateGameRequester.getSentence("법률", "101"));

        // then
        assertThat(e.getErrorCode()).isIn(INVALID_GAME_SUBJECT_TYPE, INVALID_GAME_SENTENCE_NUMBER);
    }

}