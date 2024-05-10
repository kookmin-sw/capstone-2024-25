package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;

import java.util.List;

// 응답 조회하기 위해 호출 - 2 (서버 -> AI)
public record AnswerRequest(
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
//                qnaResponsesFrom(qnas);
                qnas
        );
    }

//    private static List<QnaAndTypeResponse> qnaResponsesFrom(List<Qna> qnas) {
//        return qnas.stream()
//                .map(QnaAndTypeResponse::from)
//                .toList();
//    }
}
