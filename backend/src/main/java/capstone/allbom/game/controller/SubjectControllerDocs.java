package capstone.allbom.game.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.game.dto.SentenceAnswerResponse;
import capstone.allbom.game.dto.SentenceRequest;
import capstone.allbom.game.dto.SentenceResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "문장 순서 맞추기 게임", description = "문장 순서 맞추기 게임 API")
public interface SubjectControllerDocs {
    @Operation(summary = "과목별 현재 문장 조회하기", description = "과목별로 회원이 현재 풀어야 할 문장을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "과목별로 회원이 풀어야 할 문장 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1. 요청한 과목명과 번호에 해당하는 문장이 존재하지 않는 경우
                                                        
                            2. 요청한 번호에 해당하는 문장이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "과목명 잘못 기입한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<SentenceResponse> getSentence(
            final Member member,
            @Parameter(description = "게임 과목명", example = "literature, science, society, history, legislation")
            final String type
    );

    @Operation(summary = "과목별 문장 건너뛰기", description = "과목별로 회원이 현재 풀어야 할 문장을 건너뛴다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "과목별 문장 건너뛰기 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "해당 교과목의 모든 문제를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """                      
                            1. 요청한 과목명과 번호에 해당하는 문장이 존재하지 않는 경우
                                                        
                            2. 요청한 번호에 해당하는 문장이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "과목명 잘못 기입한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<SentenceResponse> skipSentence(
            final Member member,
            @Parameter(description = "게임 과목명", example = "literature, science, society, history, legislation")
            final String type
    );

    @Operation(summary = "과목별 문장 정답 제출하기", description = "과목별로 회원이 현재 풀어야 할 문장의 정답을 제출한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "과목별 문장 정답 제출 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "해당 교과목의 모든 문제를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """                      
                            1. 요청한 과목명과 번호에 해당하는 문장이 존재하지 않는 경우
                                                        
                            2. 요청한 번호에 해당하는 문장이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "과목명 잘못 기입한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<SentenceAnswerResponse> submitSentence(
            final Member member,
            @Parameter(description = "게임 과목명", example = "literature, science, society, history, legislation")
            final String type,
            @RequestBody SentenceRequest sentenceRequest
    );
}
