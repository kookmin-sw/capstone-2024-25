import styled from 'styled-components';
import Toggle from '../Toggle';
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

const StepName = ({ value, setValue }) => {
  const maleClick = () => {
    setValue(1);
  };
  const femaleClick = () => {
    setValue(2);
  };
  return (
    <StepWrapper>
      <StepTitle>성별 *</StepTitle>
      <Toggle
        text="남자"
        size="Large"
        selected={value === 1}
        onClick={maleClick}
      />
      <Toggle
        text="여자"
        size="Large"
        selected={value === 2}
        onClick={femaleClick}
      />
    </StepWrapper>
  );
};
export default StepName;