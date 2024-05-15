package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.MyPageResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

// 질문-응답 쌍 조회 시 호출 (클라이언트 -> 서버)
@Schema(description = "챗봇 채팅 내역 조회 응답")
public record QnaResponse(

        @Schema(description = "챗봇 프로필 이미지 URL", example = "https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
        String chatProfileImageUrl,

        @Schema(description = "스무고개 대화 내역과 타입 쌍")
        List<QnaAndTypeResponse> qnaResponses
) {
    public static QnaResponse from(Member member, List<QnaAndTypeResponse> qnaResponses) {
        return new QnaResponse(
                member.getChatProfileImageUrl(), qnaResponses
        );
    }
}
