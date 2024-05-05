package capstone.allbom.member.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.AddressUpdateRequest;
import capstone.allbom.member.dto.BirthdayUpdateRequest;
import capstone.allbom.member.dto.MyPageResponse;
import capstone.allbom.member.dto.PhoneNumberUpdateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "마이페이지", description = "마이페이지 API")
public interface MyPageControllerDocs {
    @Operation(summary = "마이페이지 내 정보 조회하기", description = "마이페이지 내 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일자리 데이터 리스트 조회 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청한 ID에 해당하는 멤버가 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<MyPageResponse> getMyPage(
            final Member member
    );

    @Operation(summary = "마이페이지 생년월일 업데이트 하기", description = "마이페이지에서 생년월일을 업데이트 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "생년월일 업데이트 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청한 ID에 해당하는 멤버가 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateBirthday(
            final Member member,
            @RequestBody final BirthdayUpdateRequest birthdayRequest
    );

    @Operation(summary = "마이페이지 전화번호 업데이트 하기", description = "마이페이지에서 전화번호를 업데이트 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "전화번호 업데이트 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청한 ID에 해당하는 멤버가 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updatePhoneNumber(
            final Member member,
            @RequestBody final PhoneNumberUpdateRequest phoneNumberRequest
    );

    @Operation(summary = "마이페이지 주소 업데이트 하기", description = "마이페이지에서 주소를 업데이트 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "주소 업데이트 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청한 ID에 해당하는 멤버가 존재하지 않는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "요청한 주소에서 시도를 추출 후 변환하여 저장하는 과정에서 문제가 발생하는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateAddress(
            final Member member,
            @RequestBody final AddressUpdateRequest addressRequest
    );
}
