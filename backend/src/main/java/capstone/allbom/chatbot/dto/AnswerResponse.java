package capstone.allbom.chatbot.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.media.Schema;

import java.io.IOException;

// 질문에 대한 응답 - 3 (AI -> 서버)
@Schema(description = "챗봇 질문 전송 및 답변 조회 응답")
public record AnswerResponse(
        @Schema(description = "답변 유형", example = "GENERAL, WEATHER, NEWS, PARK, SHOPPING, EDUCATION, CARE, BATH, RECUPERATION")
        String type,

        @Schema(description = "답변", example = "바깥 날씨 좋은데 잠깐 산책이라도 어떠세요?")
        String answer
) {
    public static AnswerResponse fromJson(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, AnswerResponse.class);
    }
}
