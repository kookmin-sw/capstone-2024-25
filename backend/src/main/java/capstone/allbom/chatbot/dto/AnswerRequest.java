package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;

import java.util.List;

// 응답 조회하기 위해 호출 - 2 (서버 -> AI)
public record AnswerRequest(
        List<QnaAndTypeResponse> qnas,
        String address,
        String gender,
        Boolean isGame,
        String question
) {
    public static AnswerRequest from(Member member, QuestionRequest questionRequest, List<QnaAndTypeResponse> qnas) {
        return new AnswerRequest(
                qnas,
                member.getAddress(), member.getGender().toString(),
                questionRequest.isGame(), questionRequest.question()
        );
    }

//    private static List<QnaAndTypeResponse> qnaResponsesFrom(List<Qna> qnas) {
//        return qnas.stream()
//                .map(QnaAndTypeResponse::from)
//                .toList();
//    }
}
