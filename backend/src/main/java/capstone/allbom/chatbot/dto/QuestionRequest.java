package capstone.allbom.chatbot.dto;

import io.swagger.v3.oas.annotations.media.Schema;

// 질문 요청 - 1 (클라이언트 -> 서버)
@Schema(description = "챗봇 질문 전송 요청")
public record QuestionRequest(

        @Schema(description = "스무고개 게임인지 여부", example = "false")
        Boolean isGame,

        @Schema(description = "질문", example = "비행기야?")
        String question
) {
}
