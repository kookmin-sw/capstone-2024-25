package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.MyPageResponse;

public record QnaResponse(
        String chatProfileImageUrl,
        String question,
        String answer
) {
    public static QnaResponse from(Member member, Qna qna) {
        return new QnaResponse(
                member.getChatProfileImageUrl(), qna.getQuestion(), qna.getAnswer()
        );
    }
}
