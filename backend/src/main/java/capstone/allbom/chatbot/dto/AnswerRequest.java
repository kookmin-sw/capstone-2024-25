package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;

// 응답 조회하기 위해 호출 - 2 (서버 -> AI)
public record AnswerRequest(
        Boolean isGame,
        String question,
        String gender
) {
    public static AnswerRequest from(Member member, QuestionRequest questionRequest) {
        return new AnswerRequest(
                questionRequest.isGame(), questionRequest.question(), member.getGender().toString()
        );
    }
}
