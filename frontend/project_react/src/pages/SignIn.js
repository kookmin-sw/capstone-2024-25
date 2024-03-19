// SignIn.js
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';

const SignUpWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 60px 28px;
  box-sizing: border-box;
`;
const LogoImage = styled.img``;

const SignUpContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
`;

const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
  margin-top: 20px;
`;

const SignUpButton = styled.span`
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

const SignUp = () => {
  const Rest_api_key = process.env.REACT_APP_REST_API_KEY; //REST API KEY
  const redirect_uri = 'http://localhost:3000/api/user/kakao/callback'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SignUpWrapper>
      <LogoImage src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="logo" />
      <SignUpContent>
        <Input
          value={userId}
          inputInfo="아이디를 입력해주세요"
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          value={password}
          inputInfo="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
        />
        <Button
          size={'Large'}
          height={'Tall'}
          type={'Primary'}
          text={'로그인'}
        />
        <FooterText>
          아직 회원이 아니신가요 ?<SignUpButton>회원가입</SignUpButton>
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
      </SignUpContent>
    </SignUpWrapper>
  );
};
export default SignUp;
