package capstone.allbom.game.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "과목별 문장 정답 제출 요청")
public record SentenceRequest(
        @Schema(description = "문장", example = "눈부시게 빛나는 별들이 하늘을 수놓고 있었다.")
        @NotNull(message = "문장 입력은 필수입니다.")
        String sentence
) {
    public SentenceRequest {
    }

}
