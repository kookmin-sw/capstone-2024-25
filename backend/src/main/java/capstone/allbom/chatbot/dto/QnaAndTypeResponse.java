package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import io.swagger.v3.oas.annotations.media.Schema;

// 질문-응답 쌍 전송 시 호출 (서버 -> AI)

@Schema(description = "대화 내역과 타입 쌍")
public record QnaAndTypeResponse(
        @Schema(description = "질문", example = "오늘은 뭐하지")
        String question,

        @Schema(description = "답변", example = "바깥 날씨 좋은데 잠깐 산책이라도 어떠세요?")
        String answer,

        @Schema(description = "답변 유형", example = "GENERAL")
        String type
) {
    public static QnaAndTypeResponse from(Qna qna) {
        return new QnaAndTypeResponse(
                qna.getQuestion(), qna.getAnswer(), qna.getType().toString()
        );
    }
}
