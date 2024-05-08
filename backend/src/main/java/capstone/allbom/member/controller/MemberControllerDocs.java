package capstone.allbom.member.controller;

import capstone.allbom.common.exception.ExceptionResponse;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.ChatProfileImgUpdateRequest;
import capstone.allbom.member.dto.MemberUpdateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "회원", description = "회원 API")
public interface MemberControllerDocs {
    @Operation(summary = "첫 로그인 시 추가 회원 정보로 업데이트 하기", description = "회원가입 이후 첫 로그인 시 추가 회원 정보로 업데이트를 수행한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "추가 회원 정보 업데이트 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 추가 회원 정보 업데이트를 수행한 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "요청한 주소에서 시도를 추출 후 변환하여 저장하는 과정에서 문제가 발생하는 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> updateMember(
            final Member member,
            @RequestBody final MemberUpdateRequest memberUpdateRequest
    );

    @Operation(summary = "일반 로그인 시 아이디 중복 여부 조회", description = "일반 로그인 시 아이디 중복 여부를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "사용 가능한 로그인 아이디인 경우"),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 존재하는 로그인 아이디인 경우",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<String> checkDuplicate(
            final String loginId
    );

    @Operation(summary = "챗봇 이미지 업데이트 하기", description = "회원의 챗봇 이미지를 업데이트 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "챗봇 이미지 업데이트 성공")
    })
    ResponseEntity<Void> updateChatbotImg(
            final Member member,
            @RequestBody final ChatProfileImgUpdateRequest chatImgUpdateRequest
    );
}
