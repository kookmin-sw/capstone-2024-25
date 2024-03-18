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
  border: 1px solid blue;
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
  border: 1px solid red;
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

const SignUp = () => {
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
      </SignUpContent>
    </SignUpWrapper>
  );
};
export default SignUp;
