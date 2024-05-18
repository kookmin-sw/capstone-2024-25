package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.AnswerType;
import capstone.allbom.chatbot.domain.Qna;
import io.swagger.v3.oas.annotations.media.Schema;

public record QnaAndTypeForAiResponse(
        @Schema(description = "질문", example = "오늘은 뭐하지")
        String question,

        @Schema(description = "답변", example = "바깥 날씨 좋은데 잠깐 산책이라도 어떠세요?")
        String answer,

        @Schema(description = "답변 유형", example = "GENERAL")
        String type
) {
    public static QnaAndTypeForAiResponse from(Qna qna) {
        String answer = qna.getType() == AnswerType.NEWS ? "" : qna.getAnswer();

        return new QnaAndTypeForAiResponse(
                qna.getQuestion(), answer, qna.getType().toString()
        );
    }
}

