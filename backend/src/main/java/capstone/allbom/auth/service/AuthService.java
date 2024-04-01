package capstone.allbom.auth.service;

import capstone.allbom.auth.dto.request.AccessTokenRequest;
import capstone.allbom.auth.dto.request.GeneralLoginRequest;
import capstone.allbom.auth.dto.request.GeneralSignUpRequest;
import capstone.allbom.auth.dto.response.KakaoMemberResponse;
import capstone.allbom.auth.exception.AuthErrorCode;
import capstone.allbom.auth.service.dto.LoginTokenDto;
import capstone.allbom.auth.service.dto.ReissuedTokenDto;
import capstone.allbom.auth.service.dto.TokenPayloadDto;
import capstone.allbom.auth.service.general.PasswordEncoder;
import capstone.allbom.auth.service.oauth.kakao.KakaoOAuthClient;
import capstone.allbom.common.exception.*;
import capstone.allbom.common.jwt.TokenPayload;
import capstone.allbom.common.jwt.TokenProcessor;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.exception.MemberErrorCode;
import capstone.allbom.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final KakaoOAuthClient kakaoOAuthClient;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final TokenProcessor tokenProcessor;
    private final RedisTemplate<String, Long> redisTemplate;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public LoginTokenDto generalRegister(final GeneralSignUpRequest signUpRequest) {
        memberService.validateDuplicateLoginId(signUpRequest.loginId());
        String encryptPassword = passwordEncoder.encode(signUpRequest.loginPassword());

        final Member member = Member.from(signUpRequest, encryptPassword);
        final Member registeredMember = memberService.registerFromGeneral(member);
        final String accessToken = tokenProcessor.generateAccessToken(registeredMember.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(registeredMember.getId());
        redisTemplate.opsForValue().set(refreshToken, registeredMember.getId(), Duration.ofDays(14L));
        return new LoginTokenDto(accessToken, refreshToken, registeredMember.hasEssentialInfo());
    }

    @Transactional
    public LoginTokenDto generalLogin(final GeneralLoginRequest loginRequest) {
        Member member = memberRepository.findByLoginId(loginRequest.loginId())
                .orElseThrow(() -> new NotFoundException(MemberErrorCode.NON_EXISTENT_MEMBER));

        if (!passwordEncoder.matches(loginRequest.loginPassword(), member.getLoginPassword()))
            throw new UnauthorizedException(DefaultErrorCode.INCORRECT_PASSWORD_OR_ACCOUNT);
        final String accessToken = tokenProcessor.generateAccessToken(member.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(member.getId());
        redisTemplate.opsForValue().set(refreshToken, member.getId(), Duration.ofDays(14L));
        return new LoginTokenDto(accessToken, refreshToken, member.hasEssentialInfo());
    }

    @Transactional
    public LoginTokenDto kakaoRegister(final String code) {
        final String kakaoAccessToken = kakaoOAuthClient.getAccessToken(code);
        final KakaoMemberResponse response = kakaoOAuthClient.getMemberInfo(kakaoAccessToken);

        final Member member = Member.from(response);
        final Member registeredMember = memberService.registerFromKakao(member);
        final String accessToken = tokenProcessor.generateAccessToken(registeredMember.getId());
        final String refreshToken = tokenProcessor.generateRefreshToken(registeredMember.getId());
        redisTemplate.opsForValue().set(refreshToken, registeredMember.getId(), Duration.ofDays(14L));
        return new LoginTokenDto(accessToken, refreshToken, registeredMember.hasEssentialInfo());
    }

    @Transactional
    public ReissuedTokenDto reissueAuthToken(
            final AccessTokenRequest request,
            final String refreshTokenByRequest
    ) {
        tokenProcessor.validateToken(refreshTokenByRequest);

        final TokenPayloadDto tokenPayloadDto = parseTokens(request.accessToken(), refreshTokenByRequest);
        final TokenPayload accessTokenPayload = tokenPayloadDto.accessTokenPayload();
        final TokenPayload refreshTokenPayload = tokenPayloadDto.refreshTokenPayload();

        redisTemplate.delete(refreshTokenByRequest);
        validateTokenInfo(accessTokenPayload, refreshTokenPayload);

        final String newAccessToken = tokenProcessor.generateAccessToken(accessTokenPayload.memberId());
        final String newRefreshToken = tokenProcessor.generateRefreshToken(refreshTokenPayload.memberId());
        redisTemplate.opsForValue().set(newRefreshToken, accessTokenPayload.memberId(), Duration.ofDays(14L));
        return new ReissuedTokenDto(newAccessToken, newRefreshToken);
    }

    private void validateTokenInfo(final TokenPayload accessTokenPayload, final TokenPayload refreshTokenPayload) {
//        System.out.println("accessTokenPayload = " + accessTokenPayload.memberId());
        if (!Objects.equals(accessTokenPayload.memberId(), refreshTokenPayload.memberId())) {
            throw new BadRequestException(AuthErrorCode.UNMATCHED_INFORMATION_BETWEEN_TOKEN);
        }
    }

    private TokenPayloadDto parseTokens(final String accessToken, final String refreshToken) {
        final TokenPayload accessTokenPayload;
        final TokenPayload refreshTokenPayload;
        try {
            accessTokenPayload = tokenProcessor.parseToken(accessToken);
            refreshTokenPayload = tokenProcessor.parseToken(refreshToken);
        } catch (final JsonProcessingException e) {
            throw new BadRequestException(JsonErrorCode.UNEXPECTED_EXCEPTION);
        }
        return new TokenPayloadDto(accessTokenPayload, refreshTokenPayload);
    }

    @Transactional
    public void deleteRefreshToken(final String refreshTokenByRequest) {
        redisTemplate.delete(refreshTokenByRequest);
    }

//    @Transactional
//    public void deleteMember(final Member member) {
//        kakaoOAuthClient.disconnectFromKakao(member);
//        memberService.deleteMember(member);
//    }

}
