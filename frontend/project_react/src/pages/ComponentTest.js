import Button from '../components/Button';
import styled from 'styled-components';

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
`;

const ComponentTest = () => {
  return (
    <TestWrapper>
      <Button text="Large Primary" size="Large" height="Tall" type="Primary" />
      <Button text="Small Primary" size="Small" height="Short" type="Primary" />
      <Button text="Large Back" size="Large" height="Tall" type="Back" />
      <Button text="Small Back" size="Small" height="Short" type="Back" />
      <Button
        text="Large Primary Disabled"
        size="Large"
        height="Tall"
        type="Primary"
        disabled
      />
      <Button
        text="Small Primary Disabled"
        size="Small"
        height="Short"
        type="Primary"
        disabled
      />
      <Button
        text="Large Back Disabled"
        size="Large"
        height="Tall"
        type="Back"
        disabled
      />
      <Button
        text="Small Back Disabled"
        size="Small"
        height="Short"
        type="Back"
        disabled
      />
    </TestWrapper>
  );
};

export default ComponentTest;
