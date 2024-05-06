package capstone.allbom.job.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.job.dto.JobDetailResponse;
import capstone.allbom.job.dto.JobListResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "일자리", description = "일자리 API")
public interface JobControllerDocs {

    @Operation(summary = "일자리 데이터 리스트 조회하기", description = "전체 일자리 데이터를 리스트로 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일자리 데이터 리스트 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "일자리 리스트 조회하기 위한 sorted(정렬을 위한 쿼리 파라미터 값)이 0과 1 이외의 값인 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<List<JobListResponse>> getJobs(
            final Member member,
            @Parameter(description = "정렬 유형 (0: 가까운 순, 1: 마감일자 순)", example = "0, 1")
            final Integer sorted,
            @Parameter(description = "페이지네이션 (page: 현재 페이지 수 - 1, size: 10으로 고정)", example = "page=0&size=10")
            Pageable pageable
    );

    @Operation(summary = "일자리 데이터 상세 조회하기", description = "일자리 데이터를 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일자리 데이터 상세 조회 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "요청한 ID에 해당하는 일자리 데이터가 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<JobDetailResponse> getDetailJob(
            final Member member,
            @Positive(message = "일자리 ID는 양의 정수만 가능합니다.") final Long jobId
    );
}
