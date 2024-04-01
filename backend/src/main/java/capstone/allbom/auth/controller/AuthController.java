package capstone.allbom.auth.controller;

import capstone.allbom.auth.dto.request.AccessTokenRequest;
import capstone.allbom.auth.dto.request.GeneralLoginRequest;
import capstone.allbom.auth.dto.request.GeneralSignUpRequest;
import capstone.allbom.auth.dto.response.GeneralSignUpResponse;
import capstone.allbom.auth.dto.response.LoginResponse;
import capstone.allbom.auth.dto.response.ReissuedAccessTokenResponse;
import capstone.allbom.auth.exception.AuthErrorCode;
import capstone.allbom.auth.service.AuthService;
import capstone.allbom.auth.service.dto.LoginTokenDto;
import capstone.allbom.auth.service.dto.ReissuedTokenDto;
import capstone.allbom.common.exception.BadRequestException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

import static org.springframework.boot.web.server.Cookie.*;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
@Slf4j
public class AuthController {

    private final AuthService authService;

    @GetMapping("/kakao/callback")
    public ResponseEntity<LoginResponse> loginByKakao(
            @RequestParam final String code,
            final HttpServletResponse httpServletResponse
    ) {
        final LoginTokenDto loginTokenDto = authService.kakaoRegister(code);

        System.out.println("loginTokenDto = " + loginTokenDto);

        addRefreshTokenToCookie(httpServletResponse, loginTokenDto.refreshToken());
        final LoginResponse response =
                new LoginResponse(loginTokenDto.accessToken(), loginTokenDto.hasEssentialInfo());

        System.out.println("kakao.callback.response = " + response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<GeneralSignUpResponse> registerByGeneral(
            @RequestBody GeneralSignUpRequest generalSignUpRequest,
            final HttpServletResponse httpServletResponse) {

        GeneralSignUpResponse signUpResponse = authService.generalRegister(generalSignUpRequest);

        return ResponseEntity.ok(signUpResponse);
    }

    @PostMapping("/general/login")
    public ResponseEntity<LoginResponse> loginByGeneral(
            @RequestBody GeneralLoginRequest generalLoginRequest,
            final HttpServletResponse httpServletResponse) {

        final LoginTokenDto loginTokenDto = authService.generalLogin(generalLoginRequest);
        System.out.println("GenralLoginTokenDto = " + loginTokenDto);

        addRefreshTokenToCookie(httpServletResponse, loginTokenDto.refreshToken());
        final LoginResponse response =
                new LoginResponse(loginTokenDto.accessToken(), loginTokenDto.hasEssentialInfo());

        System.out.println("GeneralLoginResponse = " + response);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<ReissuedAccessTokenResponse> reissueAccessToken(
            @RequestBody @Valid final AccessTokenRequest request,
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) {
        final String refreshToken = getRefreshTokenFromCookie(httpServletRequest);
        log.info("refreshToken={}", refreshToken);
        final ReissuedTokenDto reissuedTokenDto = authService.reissueAuthToken(request, refreshToken);

        addRefreshTokenToCookie(httpServletResponse, reissuedTokenDto.refreshToken());
        final ReissuedAccessTokenResponse response = new ReissuedAccessTokenResponse(reissuedTokenDto.accessToken());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) {
        final String refreshToken = getRefreshTokenFromCookie(httpServletRequest);
        authService.deleteRefreshToken(refreshToken);

        expireCookie(httpServletResponse, refreshToken);
        return ResponseEntity.noContent().build();
    }

//    @DeleteMapping("/members/me/delete")
//    public ResponseEntity<Void> deleteMember(@Auth final Member loginMember) {
//        authService.deleteMember(loginMember);
//        return ResponseEntity.noContent().build();
//    }

    // 클라이언트쪽에 refresh token set-cookie 해주는 함수
    private void addRefreshTokenToCookie(final HttpServletResponse httpServletResponse, final String refreshToken) {
        final ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1209600)
                .sameSite(SameSite.NONE.attributeValue())
                .build();
        httpServletResponse.setHeader("Set-Cookie", responseCookie.toString());
    }

    private String getRefreshTokenFromCookie(final HttpServletRequest httpServletRequest) {
        return Arrays.stream(httpServletRequest.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BadRequestException(AuthErrorCode.NONEXISTENT_REFRESH_TOKEN));
    }

    private void expireCookie(final HttpServletResponse httpServletResponse, final String refreshToken) {
        final ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite(SameSite.NONE.attributeValue())
                .build();
        httpServletResponse.setHeader("Set-Cookie", responseCookie.toString());
    }
}
