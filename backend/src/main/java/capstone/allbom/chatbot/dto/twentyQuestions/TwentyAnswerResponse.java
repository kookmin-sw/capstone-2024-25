package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.dto.AnswerResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

// 스무고개 질문에 대한 응답 - 3 (AI -> 서버)
public record TwentyAnswerResponse(
        Boolean isCorrect,
        String solution,
        Integer questionCount,
        String answer
) {

    public static TwentyAnswerResponse fromJson(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, TwentyAnswerResponse.class);
    }
}