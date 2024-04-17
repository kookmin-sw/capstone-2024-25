package capstone.allbom.game.dto;

import jakarta.validation.constraints.NotNull;

public record SentenceRequest(
        @NotNull(message = "문장 입력은 필수입니다.")
        String sentence
) {
    public SentenceRequest {
    }

}
