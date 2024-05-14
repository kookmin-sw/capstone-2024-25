package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.domain.TwentyQuestions;
import capstone.allbom.chatbot.dto.QnaAndTypeResponse;
import capstone.allbom.chatbot.dto.QnaPair;
import capstone.allbom.chatbot.dto.QuestionRequest;

import java.util.List;

public record TwentyAnswerRequest(
        Boolean isGame,
        String solution,
        List<QnaPair> qnas,
        String question
) {
    public static TwentyAnswerRequest from(QuestionRequest questionRequest, TwentyQuestions twentyQuestions, List<QnaPair> qnas) {
        return new TwentyAnswerRequest(
                questionRequest.isGame(), twentyQuestions.getSolution(),
                qnas, questionRequest.question()
        );
    }
}
