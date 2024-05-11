package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.domain.TwentyQuestions;
import capstone.allbom.chatbot.dto.QnaAndTypeResponse;
import capstone.allbom.chatbot.dto.QuestionRequest;

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