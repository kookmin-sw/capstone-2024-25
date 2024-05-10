package capstone.allbom.chatbot.dto;

// 질문 요청 - 1 (클라이언트 -> 서버)
public record QuestionRequest(
        Boolean isGame,
        String question
) {
}
