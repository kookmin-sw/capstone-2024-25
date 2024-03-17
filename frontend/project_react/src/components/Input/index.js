// Input/index.js

import styled from 'styled-components';
import { useState } from 'react';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
`;

const InputStyled = styled.input`
  width: 100%;
  font-size: 24px;
  box-sizing: border-box;
  border: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
  outline: none;
  padding-bottom: 8px;
  ::placeholder {
    color: var(--unselected-color);
  }
`;
const InputInfo = styled.div`
  font-size: 16px;
  color: ${({ infoState }) =>
    infoState === 'error'
      ? 'var(--error-color)'
      : infoState === 'success'
      ? 'black'
      : 'var(--unselected-color)'};
`;

const Input = ({ text, inputInfo, infoState, infoText, onChange, type }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  const displayValue =
    type === 'password' && inputValue.length > 0
      ? `${'*'.repeat(inputValue.length - 1)}${inputValue.slice(-1)}`
      : inputValue;

  return (
    <InputWrapper>
      <InputStyled
        placeholder={inputInfo}
        value={displayValue}
        onChange={handleChange}
      />
      <InputInfo infoState={infoState}>{infoText}</InputInfo>
    </InputWrapper>
  );
};
export default Input;
