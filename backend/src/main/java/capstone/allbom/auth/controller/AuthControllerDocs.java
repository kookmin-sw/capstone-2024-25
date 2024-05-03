package capstone.allbom.auth.controller;

import capstone.allbom.auth.dto.request.GeneralLoginRequest;
import capstone.allbom.auth.dto.request.GeneralSignUpRequest;
import capstone.allbom.auth.dto.response.GeneralSignUpResponse;
import capstone.allbom.auth.dto.response.LoginResponse;
import capstone.allbom.auth.dto.response.ReissuedAccessTokenResponse;
import capstone.allbom.common.exception.ExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Tag(name = "인증", description = "인증 API")
public interface AuthControllerDocs {

    @Operation(summary = "카카오 로그인 하기", description = "카카오 계정으로 로그인 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "카카오 로그인 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 요청",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "올바르지 않은 인증코드",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<LoginResponse> loginByKakao(
            @Parameter(description = "카카오 인가코드", example = "4VQlRJEMsqYpFkOmDZfPhyO0zGGTTG9AX348qxl4xKvuuaDPRoI3QNCmz0wKPXMXAAABjo6aK8vNsk3jZ7dWzg") final String code,
            final HttpServletResponse httpServletResponse
    );

    @Operation(summary = "일반 로그인 하기", description = "아이디, 비밀번호로 로그인 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일반 로그인 성공"),
            @ApiResponse(
                    responseCode = "401",
                    description = "올바르지 않은 계정 혹은 비밀번호",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 로그인 아이디",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<LoginResponse> loginByGeneral(
            @RequestBody GeneralLoginRequest generalLoginRequest,
            final HttpServletResponse httpServletResponse
    );

    @Operation(summary = "일반 회원가입 하기", description = "아이디, 비밀번호로 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일반 회원가입 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 존재하는 계정 혹은 로그인 아이디",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<GeneralSignUpResponse> registerByGeneral(
            @RequestBody GeneralSignUpRequest generalSignUpRequest,
            final HttpServletResponse httpServletResponse
    );


    @Operation(summary = "액세스 토큰 재발급 하기", description = "액세스 토큰을 재발급 받는다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "액세스 토큰 재발급 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 갱신 토큰",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "요청으로부터 찾을 수 없는 갱신 토큰",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<ReissuedAccessTokenResponse> reissueAccessToken(
            @RequestHeader("Authorization") final String authorizationHeader,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    );

    @Operation(summary = "로그아웃 하기", description = "로그아웃 한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 갱신 토큰",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    ResponseEntity<Void> logout(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    );
}
