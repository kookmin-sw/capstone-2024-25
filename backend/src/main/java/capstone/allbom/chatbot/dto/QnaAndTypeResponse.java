package capstone.allbom.chatbot.dto;

import capstone.allbom.chatbot.domain.Qna;

// 질문-응답 쌍 전송 시 호출 (서버 -> AI)
public record QnaAndTypeResponse(
        String question,
        String answer,
        String type
) {
    public static QnaAndTypeResponse from(Qna qna) {
        return new QnaAndTypeResponse(
                qna.getQuestion(), qna.getAnswer(), qna.getType().toString()
        );
    }
}
