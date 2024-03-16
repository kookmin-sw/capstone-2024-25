import styled from 'styled-components';
import { useState } from 'react';
import Step from '../components/SignUp/step';
import Button from '../components/Button';

const SignUpWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid blue;
  padding: 60px 24px;
  box-sizing: border-box;
`;

const SignUpTitle = styled.div`
  font-size: 40px;
  align-self: flex-start;
  margin-left: 20px;
`;

const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
  transition: transform 0.5s ease-in-out;
  transform: ${({ stepValue }) => `translateX(-${stepValue * 100}%)`};
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
const SignUpFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
  margin-top: 20px;
`;
const LoginButton = styled.span`
  color: var(--primary-color);
  cursor: pointer;
`;

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [stepValue, setStepValue] = useState(0);

  const gungun = () => {
    console.log('userId : ', userId);
  };

  return (
    <SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <StepWrapper>
        <Step value={userId} setValue={setUserId}></Step>
      </StepWrapper>
      <SignUpFooter>
        <ButtonWrapper>
          <Button text="이전" size="Large" height="Tall" type="Back" />
          <Button
            text="다음"
            size="Large"
            height="Tall"
            type="Primary"
            onClick={() => setStepValue(stepValue + 1)}
          />
        </ButtonWrapper>
        <FooterText>
          이미 계정이 있으신가요?
          <LoginButton>로그인</LoginButton>
        </FooterText>
      </SignUpFooter>
    </SignUpWrapper>
  );
};
export default SignUp;
