package capstone.allbom.auth.service;

import capstone.allbom.auth.dto.request.GeneralLoginRequest;
import capstone.allbom.auth.dto.request.GeneralSignUpRequest;
import capstone.allbom.auth.dto.response.GeneralSignUpResponse;
import capstone.allbom.auth.service.dto.LoginTokenDto;
import capstone.allbom.auth.service.general.PasswordEncoder;
import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.common.exception.UnauthorizedException;
import capstone.allbom.common.jwt.TokenPayload;
import capstone.allbom.common.jwt.TokenProcessor;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.exception.MemberErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.persistence.EntityManager;
import jakarta.validation.constraints.AssertTrue;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static capstone.allbom.common.exception.DefaultErrorCode.DUPLICATED_LOGIN_ID;
import static capstone.allbom.common.exception.DefaultErrorCode.INCORRECT_PASSWORD_OR_ACCOUNT;
import static capstone.allbom.member.exception.MemberErrorCode.NON_EXISTENT_MEMBER;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @Autowired EntityManager entityManager;
    @Autowired AuthService authService;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired MemberRepository memberRepository;
    @Autowired TokenProcessor tokenProcessor;

    @Nested
    class registerMember {

        GeneralSignUpRequest signUpRequest = new GeneralSignUpRequest(
                "esssun",
                "kookmin123"
        );

        @Test
        void 일반_회원가입_시_아이디_중복이_발생하면_예외가_발생한다() {
            // given
            GeneralSignUpRequest duplicatedSignUpRequest = new GeneralSignUpRequest(
                    "esssun",
                    "woori1234"
            );
            authService.generalRegister(signUpRequest);

            // when
            BadRequestException e = assertThrows(BadRequestException.class, ()
                    -> authService.generalRegister(duplicatedSignUpRequest));

            // then
            assertThat(e.getErrorCode()).isEqualTo(DUPLICATED_LOGIN_ID);
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 로그인 아이디입니다.");

        }

    }

    @Nested
    class generalLoginMember {

        GeneralSignUpRequest signUpRequest = new GeneralSignUpRequest(
                "esssun",
                "kookmin123"
        );

        GeneralLoginRequest loginRequest = new GeneralLoginRequest(
                "esssun",
                "kookmin123"
        );

        @Test
        void 일반_로그인_시_입력한_비밀번호를_해시화하면_DB에_저장된_비밀번호와_같아야_한다() {
            // given
            GeneralSignUpResponse signUpResponse = authService.generalRegister(signUpRequest);
            Member member = memberRepository.findByLoginId(signUpResponse.loginId())
                    .orElseThrow(() -> new NotFoundException(NON_EXISTENT_MEMBER));

            // when & then
            assertTrue(passwordEncoder.matches(loginRequest.loginPassword(), member.getLoginPassword()));
            assertThat(loginRequest.loginPassword()).isEqualTo("kookmin123");
            assertThat(member.getLoginPassword()).isEqualTo(passwordEncoder.encode("kookmin123"));
        }

        @Test
        void 일반_로그인_시_해당_아이디가_존재하지_않으면_예외가_발생한다() {
            // given
            authService.generalRegister(signUpRequest);
            var loginRequest = new GeneralLoginRequest(
                    "esssun1",
                    "kookmin123"
            );

            // when
            NotFoundException e = assertThrows(NotFoundException.class, ()
                    -> authService.generalLogin(loginRequest));

            // then
            assertThat(e.getErrorCode()).isEqualTo(NON_EXISTENT_MEMBER);
            assertThat(e.getMessage()).isEqualTo("해당 회원이 존재하지 않습니다.");

        }

        @Test
        void 일반_로그인_시_비밀번호가_다르면_예외가_발생한다() {
            // given
            authService.generalRegister(signUpRequest);
            var loginRequest = new GeneralLoginRequest(
                    "esssun",
                    "kookmin1234"
            );

            // when
            UnauthorizedException e = assertThrows(UnauthorizedException.class, ()
                    -> authService.generalLogin(loginRequest));

            // then
            assertThat(e.getErrorCode()).isEqualTo(INCORRECT_PASSWORD_OR_ACCOUNT);
            assertThat(e.getMessage()).isEqualTo("비밀번호가 틀렸거나, 해당 계정이 없습니다.");

        }

        @Test
        void 예외가_발생하지_않으면_로그인이_성공한다() throws JsonProcessingException {
            // given
            authService.generalRegister(signUpRequest);
            Member member = memberRepository.findByLoginId(loginRequest.loginId())
                    .orElseThrow(() -> new NotFoundException(NON_EXISTENT_MEMBER));

            // when
            LoginTokenDto loginTokenDto = authService.generalLogin(loginRequest);
            String token = "Bearer " + loginTokenDto.accessToken();
            final String tokenWithoutType = tokenProcessor.extractAccessToken(token);
            final TokenPayload tokenPayload = tokenProcessor.decodeToken(tokenWithoutType);

            // then
            assertThat(member.getId()).isEqualTo(tokenPayload.memberId());
        }
    }
}