package capstone.allbom.chatbot.dto.twentyQuestions;

import capstone.allbom.chatbot.dto.QnaPair;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "스무고개 채팅 내역 조회 응답")
public record TwentyQnaResponse(
        @Schema(description = "프로필 이미지 URL", example = "https://allbom.s3.ap-northeast-2.amazonaws.com/female.jpg")
        String memberProfileImageUrl,

        @Schema(description = "챗봇 프로필 이미지 URL", example = "https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
        String chatProfileImageUrl,

        @Schema(description = "정답", example = "망고")
        String solution,

        @Schema(description = "남은 질문 가능 횟수", example = "19")
        Integer questionCount,

        @Schema(description = "스무고개 대화 내역 쌍")
        List<QnaPair> qnaPairs
) {
    public static TwentyQnaResponse from(Member member, List<QnaPair> qnaPairs, String solution, Integer questionCount) {
        return new TwentyQnaResponse(
                member.getProfileImageUrl(), member.getChatProfileImageUrl(),
                solution, questionCount,
                qnaPairs
        );
    }
}
