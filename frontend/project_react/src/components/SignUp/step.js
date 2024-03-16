import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid red;
  gap: 8px;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
`;

const Step = ({ step, value, setValue, inputInfo, infoState, infoText }) => {
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const [errorState, setErrorState] = useState(0);
  const stateList = ['', 'error', 'success'];
  const gugu = () => {
    console.log('value:', value);
  };
  return (
    <StepWrapper>
      <StepTitle>아이디</StepTitle>
      <Input
        text={value}
        inputInfo="아이디를 입력해주세요"
        infoText="6자 이상 12자 이내. 영문, 숫자 사용 가능"
        infoState={stateList[errorState]}
        onChange={handleInputChange}
      />
      <Button
        text="중복 확인"
        size="Large"
        height="Short"
        type="Primary"
        onClick={() => gugu()}
      />
    </StepWrapper>
  );
};
export default Step;
