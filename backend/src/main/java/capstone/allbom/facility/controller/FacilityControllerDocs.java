package capstone.allbom.facility.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.facility.dto.FacilityListResponse;
import capstone.allbom.facility.dto.FacilityRequest;
import capstone.allbom.facility.dto.MapDetailResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "지도", description = "지도 API")
public interface FacilityControllerDocs {
    @Operation(summary = "전체 지도 데이터 리스트 조회하기", description = "전체 지도 데이터를 리스트로 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "전체 지도 데이터 조회 성공"),
    })
    ResponseEntity<List<FacilityListResponse>> getFacilities(
            final Member member,
            @Parameter(description = "남서쪽 위도", example = "37.54937578781175")
            @RequestParam final Double swLatitude,
            @Parameter(description = "남서쪽 경도", example = "126.06966952193312")
            @RequestParam final Double swLongitude,
            @Parameter(description = "북동쪽 위도", example = "37.55140084746174")
            @RequestParam final Double neLatitude,
            @Parameter(description = "북동쪽 위도", example = "127.07328144110905")
            @RequestParam final Double neLongitude
    );

    @Operation(summary = "특정 유형의 지도 데이터 리스트 조회하기", description = "특정 유형의 지도 데이터를 리스트로 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "특정 지도 데이터 조회 성공"),
    })
    ResponseEntity<List<FacilityListResponse>> getFacilitiesByType(
            final Member member,
            @Parameter(description = "지도 데이터 유형", example = "hospital, pharmacy, welfarehouse, welfarecenter, carecenter, job")
            final String type,
            @Parameter(description = "남서쪽 위도", example = "37.54937578781175")
            @RequestParam final Double swLatitude,
            @Parameter(description = "남서쪽 경도", example = "126.06966952193312")
            @RequestParam final Double swLongitude,
            @Parameter(description = "북동쪽 위도", example = "37.55140084746174")
            @RequestParam final Double neLatitude,
            @Parameter(description = "북동쪽 위도", example = "127.07328144110905")
            @RequestParam final Double neLongitude
    );

    @Operation(summary = "유형과 ID로 지도 데이터 상세 조회하기", description = "지도 유형과 ID로 지도 데이터를 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "지도 데이터 상세 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1. 요청한 ID에 해당하는 지도 데이터가 존재하지 않는 경우
                                                        
                            2. 요청한 ID와 유형에 해당하는 지도 데이터가 존재하지 않는 경우
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<MapDetailResponse> getFacility(
            final Member member,
            @Parameter(description = "지도 데이터 유형", example = "hospital, pharmacy, welfarehouse, welfarecenter, carecenter, job")
            final String type,
            @Positive(message = "지도 ID는 양의 정수만 가능합니다.") Long mapId
    );
}
