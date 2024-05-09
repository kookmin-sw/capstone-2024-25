package capstone.allbom.chatbot.dto;

import capstone.allbom.member.domain.Member;

import java.util.List;

public record TwentyAnswerRequest(
        Boolean isGame,
        String question,
        String gender,
        String address,
        List<QnaAndTypeResponse> qnas
) {
    public static AnswerRequest from(Member member, QuestionRequest questionRequest, List<QnaAndTypeResponse> qnas) {
        return new AnswerRequest(
                questionRequest.isGame(), questionRequest.question(),
                member.getGender().toString(), member.getAddress(),
                qnas
        );
    }
}
