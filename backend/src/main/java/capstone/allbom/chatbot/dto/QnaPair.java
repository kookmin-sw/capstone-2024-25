package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;
import lombok.Getter;

public record QnaPair(
        String question,
        String answer
) {
    public static QnaPair from(Qna qna) {
        return new QnaPair(
                qna.getQuestion(), qna.getAnswer()
        );
    }
}
