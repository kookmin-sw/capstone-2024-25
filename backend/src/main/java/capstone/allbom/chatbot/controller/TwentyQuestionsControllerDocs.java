package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerResponse;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyQnaResponse;
import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "스무고개", description = "스무고개 API")
public interface TwentyQuestionsControllerDocs {

    @Operation(summary = "스무고개 채팅 내역 조회하기", description = "스무고개 채팅 내역을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스무고개 채팅 내역 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "챗봇 프로필 업데이트가 아직 이루어지지 않은 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<TwentyQnaResponse> getQnas(
            final Member member
    );

    @Operation(summary = "스무고개 질문 전송 및 답변 조회하기", description = "스무고개 질문에 대한 답변을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스무고개 질문 전송 및 답변 조회 성공"),
            @ApiResponse(
                    responseCode = "500",
                    description = "AI 서버로부터 답변을 받아오지 못한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<TwentyAnswerResponse> requestQuestion(
            final Member member,
            @RequestBody final QuestionRequest questionRequest
    );


}
