package capstone.allbom.chatbot.dto;

// 질문에 대한 응답 - 3 (AI -> 서버)
public record AnswerResponse(
        String type,
        String answer
) {
}
