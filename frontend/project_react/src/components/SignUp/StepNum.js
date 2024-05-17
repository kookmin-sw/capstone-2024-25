import styled from 'styled-components';
import Input from '../Input';
import { useEffect, useState } from 'react';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
  font-weight: 600;
`;

const StepNum = ({ value, setValue, setNumPossible }) => {
  const [errorState, setErrorState] = useState(0);
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const stateList = ['', 'error', 'success', 'error'];

  useEffect(() => {
    if (value.length !== 0 && !/^\d+$/.test(value)) {
      // 숫자가 아닌 문자가 포함되어 있을 때
      setErrorState(3);
    } else if (value.length !== 0 && (value.length < 10 || value.length > 11)) {
      // 전화번호 길이 에러
      setErrorState(1);
    } else if (value.length === 0) {
      // 빈 칸
      setErrorState(0);
    } else {
      // 올바른 입력
      setErrorState(2);
    }
  }, [value]);
  useEffect(() => {
    if (errorState === 2) {
      setNumPossible(true);
    } else {
      setNumPossible(false);
    }
  }, [value, errorState]);

  const checkNumList = [
    '예시) 01012345678',
    '전화번호를 올바르게 입력해주세요.',
    '',
    '숫자만 입력해주세요.',
  ];
  return (
    <StepWrapper>
      <StepTitle>전화번호 *</StepTitle>
      <Input
        text={value}
        inputInfo="전화번호를 입력해주세요."
        infoState={stateList[errorState]}
        infoText={checkNumList[errorState]}
        onChange={handleInputChange}
      />
    </StepWrapper>
  );
};
export default StepNum;
