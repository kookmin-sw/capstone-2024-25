import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../Input';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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

const StepPassword = ({
  value,
  setValue,
  secondValue,
  setSecondValue,
  setPwPossible,
}) => {
  const [errorState, setErrorState] = useState(0);
  const [checkErrorState, setCheckErrorState] = useState(0);

  const validatePw = (pw) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
    return regex.test(pw);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSecondInputChange = (e) => {
    setSecondValue(e.target.value);
  };

  useEffect(() => {
    if (value !== '' && !validatePw(value)) {
      setErrorState(1);
      setPwPossible(false);
    } else if (value === '') {
      setErrorState(0);
    } else if (value !== '' && validatePw(value)) {
      setErrorState(2);
    }
  }, [value, setSecondValue]);

  useEffect(() => {
    if (secondValue !== '' && value !== secondValue) {
      setCheckErrorState(1);
      setPwPossible(false);
    } else if (secondValue === '') {
      setCheckErrorState(0);
    } else if (secondValue !== '' && value === secondValue) {
      setCheckErrorState(2);
    }
  }, [value, secondValue]);

  useEffect(() => {
    if (errorState === 2 && checkErrorState === 2) {
      setPwPossible(true);
    } else {
      setPwPossible(false);
    }
  }, [errorState, checkErrorState]);

  const checkPwList = [
    '비밀번호를 한 번 더 입력해주세요.',
    '비밀번호가 일치하지 않습니다.',
    '비밀번호를 한 번 더 입력해주세요.',
  ];
  const stateList = ['', 'error', 'success'];

  return (
    <StepWrapper>
      <StepItem>
        <StepTitle>비밀번호 *</StepTitle>
        <Input
          text={value}
          inputInfo="비밀번호를 입력해주세요."
          infoText={'8자 이상 16자 이하의 영문, 숫자 필수'}
          infoState={stateList[errorState]}
          onChange={handleInputChange}
          type="password"
          fontSize="20px"
        />
      </StepItem>
      <StepItem>
        <StepTitle>비밀번호 확인 *</StepTitle>
        <Input
          text={secondValue}
          inputInfo="비밀번호를 한 번 더 입력해주세요."
          infoText={checkPwList[checkErrorState]}
          infoState={stateList[checkErrorState]}
          onChange={handleSecondInputChange}
          type="password"
          fontSize="20px"
        />
      </StepItem>
    </StepWrapper>
  );
};

export default StepPassword;
