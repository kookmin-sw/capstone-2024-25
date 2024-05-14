package capstone.allbom.chatbot.dto;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

// 질문에 대한 응답 - 3 (AI -> 서버)
public record AnswerResponse(
        String type,
        String answer
) {
    public static AnswerResponse fromJson(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, AnswerResponse.class);
    }
}
