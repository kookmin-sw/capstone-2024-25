package capstone.allbom.medicine.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Tag(name = "약", description = "약 API")
public interface MedicineControllerDocs {
    @Operation(summary = "약 상세 조회하기", description = "회원이 보유한 약을 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "약 상세 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1. 요청한 ID에 해당하는 약이 존재하지 않는 경우

                            2. 다른 사람의 약을 조회하려 하는 경우 (요청한 ID에 해당하는 약의 주인과 토큰에 할당된 회원이 일치하지 않는 경우)
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<MedicineDetailResponse> findMedicine(
            final Member member,
            @Positive(message = "약 ID는 양의 정수만 가능합니다.") Long medicineId
    );

    @Operation(summary = "약 수정하기", description = "회원이 보유한 약을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "약 수정 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1. 요청한 ID에 해당하는 약이 존재하지 않는 경우

                            2. 다른 사람의 약을 수정하려 하는 경우 (요청한 ID에 해당하는 약의 주인과 토큰에 할당된 회원이 일치하지 않는 경우)
                            
                            3. 약 이름과 시간대 모두 변경사항이 없는 경우
                            
                            4. 약 시간대가 유효하지 않은 경우 (아침, 점심, 저녁 이외의 요청을 보낸 경우)
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateMedicine(
            final Member member,
            @Positive(message = "약 ID는 양의 정수만 가능합니다.") Long medicineId,
            @RequestBody final MedicineRequest medicineRequest
    );

    @Operation(summary = "약 삭제하기", description = "회원이 보유한 약을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "약 삭제 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            1. 요청한 ID에 해당하는 약이 존재하지 않는 경우

                            2. 다른 사람의 약을 수정하려 하는 경우 (요청한 ID에 해당하는 약의 주인과 토큰에 할당된 회원이 일치하지 않는 경우)
                            """,
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> deleteMedicine(
            final Member member,
            @Positive(message = "약 ID는 양의 정수만 가능합니다.") Long medicineId
    );

    @Operation(summary = "약 리스트 조회하기", description = "회원이 보유한 약을 리스트로 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "약 리스트 조회 성공")
    })
    ResponseEntity<List<MedicineDetailResponse>> findAllMedicine(
            final Member member
    );

    @Operation(summary = "약 등록하기", description = "약을 등록한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "약 등록 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "약 시간대가 유효하지 않은 경우 (아침, 점심, 저녁 이외의 요청을 보낸 경우)",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> saveMedicine(
            final Member member,
            @RequestBody MedicineRequest medicineRequest
    );
}
