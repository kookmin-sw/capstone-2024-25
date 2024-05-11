package capstone.allbom.chatbot.dto.twentyQuestions;

// 스무고개 질문에 대한 응답 - 3 (AI -> 서버)
public record TwentyAnswerResponse(
        Boolean isCorrect,
        String solution,
        Integer questionCount,
        String answer
) {
}