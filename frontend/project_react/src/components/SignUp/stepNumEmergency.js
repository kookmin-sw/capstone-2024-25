import styled from 'styled-components';
import Input from '../Input';
import { useState } from 'react';

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
`;

const StepNumEmergency = ({ value, setValue }) => {
  const [errorState, setErrorState] = useState(0);
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const stateList = ['', 'error', 'success'];

  const checkNumList = [
    '예시) 01012345678',
    '전화번호를 올바르게 입력해주세요.',
    '예시) 01012345678',
  ];
  return (
    <StepWrapper>
      <StepTitle>비상 시 연락처 (선택)</StepTitle>
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
export default StepNumEmergency;
