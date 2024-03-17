import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  gap: 8px;
  box-sizing: border-box;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
`;

const StepId = ({ value, setValue }) => {
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const [errorState, setErrorState] = useState(0);
  const stateList = ['', 'error', 'success'];
  const infoTextList = [
    '6자 이상 12자 이내. 영문, 숫자 사용 가능',
    '이미 사용중인 아이디입니다.',
    '사용 가능한 아이디입니다.',
  ];
  const checkId = () => {
    setErrorState(2);
  };
  return (
    <StepWrapper>
      <StepTitle>아이디 *</StepTitle>
      <Input
        text={value}
        inputInfo="아이디를 입력해주세요"
        infoText={infoTextList[errorState]}
        infoState={stateList[errorState]}
        onChange={handleInputChange}
      />
      <Button
        text="중복 확인"
        size="Large"
        height="Short"
        type="Primary"
        onClick={() => checkId()}
      />
    </StepWrapper>
  );
};
export default StepId;
