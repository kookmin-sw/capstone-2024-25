package capstone.allbom.game.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.game.dto.SubjectProgressResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "문장 순서 맞추기 게임", description = "문장 순서 맞추기 게임 API")
public interface GameControllerDocs {
    @Operation(summary = "과목별 진행률 조회하기", description = "과목별 문제 푼 진행률을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "과목별 진행률 계산 성공"),
            @ApiResponse(
                    responseCode = "500",
                    description = "과목별 진행률 계산 과정에서 음수 발생",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<SubjectProgressResponse> getProgress(
            final Member member
    );
}
