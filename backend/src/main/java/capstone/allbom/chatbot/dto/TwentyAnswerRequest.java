package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.TwentyQuestions;

import java.util.List;

public record TwentyAnswerRequest(
        Boolean isGame,
        String question,
        String solution,
        List<QnaAndTypeResponse> qnas
) {
    public static TwentyAnswerRequest from(QuestionRequest questionRequest, TwentyQuestions twentyQuestions, List<QnaAndTypeResponse> qnas) {
        return new TwentyAnswerRequest(
                questionRequest.isGame(), questionRequest.question(),
                twentyQuestions.getSolution(), qnas
        );
    }
}
