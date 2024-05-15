package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "챗봇", description = "챗봇 API")
public interface QnaControllerDocs {

    @Operation(summary = "챗봇 채팅 내역 조회하기", description = "챗봇 채팅 내역을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "챗봇 채팅 내역 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "챗봇 프로필 업데이트가 아직 이루어지지 않은 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<QnaResponse> getQnas(
            final Member member,
            @Parameter(description = "페이지네이션 (page: 현재 페이지 수 - 1, size: 15로 고정)", example = "page=0&size=10")
            Pageable pageable
    );

    @Operation(summary = "챗봇 질문 전송 및 답변 조회하기", description = "챗봇 질문에 대한 답변을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "챗봇 질문 전송 및 답변 조회 성공"),
            @ApiResponse(
                    responseCode = "500",
                    description = "AI 서버로부터 답변을 받아오지 못한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<AnswerResponse> requestQuestion(
            final Member member,
            @RequestBody final QuestionRequest questionRequest
    );
}
