package capstone.allbom.game.dto;

import capstone.allbom.game.domain.Subject;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "과목별 문장 조회 응답")
public record SentenceResponse(
        @Schema(description = "현재 문장 번호", example = "3")
        Integer currProblem,

        @Schema(description = "문장", example = "눈부시게 빛나는 별들이 하늘을 수놓고 있었다.")
        String sentence
) {
    public SentenceResponse {
    }

    public static SentenceResponse from(Subject subject, String sentence) {
        return new SentenceResponse(subject.getCurrProblem(), sentence);
    }
}
