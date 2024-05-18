package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.dto.AnswerResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.media.Schema;

import java.io.IOException;

// 스무고개 질문에 대한 응답 - 3 (AI -> 서버)
@Schema(description = "스무고개 질문 전송 및 답변 조회 응답")
public record TwentyAnswerResponse(

        @Schema(description = "정답 여부", example = "false")
        Boolean isCorrect,

        @Schema(description = "정답", example = "망고")
        String solution,

        @Schema(description = "남은 질문 가능 횟수", example = "19")
        Integer questionCount,

        @Schema(description = "답변", example = "아니요, 바나나가 아닙니다.")
        String answer
) {

    public static TwentyAnswerResponse fromJson(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, TwentyAnswerResponse.class);
    }
}