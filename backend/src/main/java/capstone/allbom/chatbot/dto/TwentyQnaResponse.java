package capstone.allbom.chatbot.dto;

import capstone.allbom.member.domain.Member;

import java.util.List;

public record TwentyQnaResponse(
        String chatProfileImageUrl,
        List<QnaPair> qnaPairs
) {
    public static TwentyQnaResponse from(Member member, List<QnaPair> qnaPairs) {
        return new TwentyQnaResponse(
                member.getChatProfileImageUrl(), qnaPairs
        );
    }
}
