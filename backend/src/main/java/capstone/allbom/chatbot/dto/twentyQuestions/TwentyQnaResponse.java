package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.dto.QnaPair;
import capstone.allbom.member.domain.Member;

import java.util.List;

public record TwentyQnaResponse(
        String memberProfileImageUrl,
        String chatProfileImageUrl,
        List<QnaPair> qnaPairs
) {
    public static TwentyQnaResponse from(Member member, List<QnaPair> qnaPairs) {
        return new TwentyQnaResponse(
                member.getProfileImageUrl(),
                member.getChatProfileImageUrl(), qnaPairs
        );
    }
}
