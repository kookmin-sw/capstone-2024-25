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
}