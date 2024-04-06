// SignIn.js
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SignInWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 60px 28px;
  box-sizing: border-box;
`;

const LogoImage = styled.img``;

const SignInContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
  margin-top: 20px;
`;

const SignInButton = styled.span`
  color: var(--primary-color);
  cursor: pointer;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--unselected-color);
`;

const KakaoButton = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  background-color: #fee502;
  border: none;
  color: #000000;
  border-radius: 10px;
  font-size: 24px;
  position: relative;
`;

const KakaoImage = styled.img`
  position: absolute;
  left: 16px;
  width: 28px;
  height: 28px;
`;

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 환경 변수에서 카카오 API 키와 리다이렉트 URI를 가져옵니다.
  const Rest_api_key = process.env.REACT_APP_REST_API_KEY; // REST API KEY
  const redirect_uri = 'http://localhost:3000/auth/kakao/callback'; //Redirect URI

  // 카카오 로그인 페이지로 이동할 URL을 구성합니다.
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  // 카카오 로그인 버튼 클릭 시 실행되는 함수입니다.
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  // 카카오 로그인 후 돌아왔을 때 URL에서 인증 코드(code)를 추출하는 로직입니다.

  return (
    <SignInWrapper>
      <LogoImage src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="logo" />
      <SignInContent>
        <Input
          value={userId}
          inputInfo="아이디를 입력해주세요"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          value={password}
          inputInfo="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          size="Large"
          height="Tall"
          type="Primary"
          text="로그인"
          // onClick={/* 로그인 처리 함수를 여기에 추가합니다. */}
        />
        <FooterText>
          아직 회원이 아니신가요? <SignInButton>회원가입</SignInButton>
        </FooterText>
        <HorizontalLine />
        <FooterText>다른 방법으로 로그인하기</FooterText>
        <KakaoButton onClick={handleLogin}>
          <KakaoImage
            src={process.env.PUBLIC_URL + '/images/kakao.svg'}
            alt="kakao"
          />
          카카오 로그인
        </KakaoButton>
      </SignInContent>
    </SignInWrapper>
  );
};

export default SignIn;
