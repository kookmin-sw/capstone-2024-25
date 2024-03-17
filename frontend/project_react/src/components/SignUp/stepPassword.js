import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  gap: 20px;
  box-sizing: border-box;
`;
const StepItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
`;

const StepPassword = ({ value, setValue, secondValue, setSecondValue }) => {
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleSecondInputChange = (e) => {
    setSecondValue(e.target.value);
  };
  const [errorState, setErrorState] = useState(0);
  const [checkErrorState, setCheckErrorState] = useState(0);
  const stateList = ['', 'error', 'success'];
  const onClickEvent = () => {
    console.log('value:', value);
  };

  const checkPwList = ['', '비밀번호가 일치하지 않습니다.'];

  return (
    <StepWrapper>
      <StepItem>
        <StepTitle>비밀번호 *</StepTitle>
        <Input
          text={value}
          inputInfo="비밀번호를 입력해주세요."
          infoText="8자 이상 16자 이하의 영문, 숫자 필수"
          infoState={stateList[errorState]}
          onChange={handleInputChange}
          type={'password'}
        />
      </StepItem>
      <StepItem>
        <StepTitle>비밀번호 확인 *</StepTitle>
        <Input
          text={secondValue}
          inputInfo="비밀번호를 한번 더 입력해주세요."
          infoText={checkPwList[checkErrorState]}
          infoState={stateList[errorState]}
          onChange={handleSecondInputChange}
          type={'password'}
        />
      </StepItem>
    </StepWrapper>
  );
};
export default StepPassword;
