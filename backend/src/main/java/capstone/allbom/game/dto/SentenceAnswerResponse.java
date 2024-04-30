package capstone.allbom.game.dto;
import capstone.allbom.game.domain.Subject;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "과목별 문장 제출 응답")
public record SentenceAnswerResponse(
        @Schema(description = "다음번에 풀어야 할 문장 번호", example = "4")
        Integer nextProblem,

        @Schema(description = "현재 문장 정답", example = "어둠이 깔린 밤, 그는 혼자 떠돌았다.")
        String sentence,

        @Schema(description = "정답 여부", example = "true")
        Boolean isAnswer
) {
    public SentenceAnswerResponse {
    }

    public static SentenceAnswerResponse from(Subject subject, String sentence, Boolean isTrue) {
        return new SentenceAnswerResponse(subject.getCurrProblem(), sentence, isTrue);
    }
}
