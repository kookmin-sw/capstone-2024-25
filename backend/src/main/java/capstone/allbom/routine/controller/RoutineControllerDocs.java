package capstone.allbom.routine.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.facility.dto.FacilityListResponse;
import capstone.allbom.facility.dto.FacilityRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.routine.dto.RoutineResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Tag(name = "투두", description = "투두 API")
public interface RoutineControllerDocs {
    @Operation(summary = "오늘의 투두 전체 조회하기", description = "오늘의 투두를 전체 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오늘의 투두 전체 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "오늘의 모든 투두를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1. 요청한 투두 카테고리에 해당하는 내용이 존재하지 않는 경우
                                                        
                            2. 요청한 투두 카테고리의 번호에 해당하는 내용이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<RoutineResponse>> getAllRoutine(
            final Member member
    );

    @Operation(summary = "오늘의 투두 조회하기", description = "오늘의 투두를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오늘의 투두 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "오늘의 투두를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1. 요청한 투두 카테고리에 해당하는 내용이 존재하지 않는 경우
                                                        
                            2. 요청한 투두 카테고리의 번호에 해당하는 내용이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<RoutineResponse> getRoutine(
            final Member member,
            @Parameter(description = "투두 카테고리", example = "exercise, growth, hobby, rest, eat")
            final String type
    );

    @Operation(summary = "오늘의 투두 다음 항목으로 수정하기", description = "오늘의 투두를 다음 항목으로 수정 후 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오늘의 투두 다음 항목으로 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "오늘의 투두를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1. 요청한 투두 카테고리에 해당하는 내용이 존재하지 않는 경우
                                                        
                            2. 요청한 투두 카테고리의 번호에 해당하는 내용이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<RoutineResponse> updateToPreviousRoutine(
            final Member member,
            @Parameter(description = "투두 카테고리", example = "exercise, growth, hobby, rest, eat")
            final String type
    );

    @Operation(summary = "오늘의 투두 이전 항목으로 수정하기", description = "오늘의 투두를 이전 항목으로 수정 후 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오늘의 투두 이전 항목으로 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "오늘의 투두를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            1. 요청한 투두 카테고리에 해당하는 내용이 존재하지 않는 경우
                                                        
                            2. 요청한 투두 카테고리의 번호에 해당하는 내용이 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<RoutineResponse> updateToNextRoutine(
            final Member member,
            @Parameter(description = "투두 카테고리", example = "exercise, growth, hobby, rest, eat")
            final String type
    );

    @Operation(summary = "오늘의 투두 수행 여부 완료 처리하기", description = "오늘의 투두 수행 여부를 완료 처리한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "오늘의 투두 수행 여부 완료 처리 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "오늘의 투두를 완료했을 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "요청한 투두 카테고리에 해당하는 내용이 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> changeRoutineStatus(
            final Member member,
            @Parameter(description = "투두 카테고리", example = "exercise, growth, hobby, rest, eat")
            final String type
    );
}
