import styled from 'styled-components';
import Input from '../Input';

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

const StepBirth = ({ value, setValue }) => {
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <StepWrapper>
      <StepTitle>생년월일 *</StepTitle>
      <Input
        text={value}
        inputInfo="생년월일을 입력해주세요"
        onChange={handleInputChange}
        type="date"
        readonly="readonly"
      />
    </StepWrapper>
  );
};
export default StepBirth;
