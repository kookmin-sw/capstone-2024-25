// Input/index.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';

import BirthModal from '../Modal/Birth2';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
  position: relative;
`;

const InputStyled = styled.input`
  width: 100%;
  font-size: ${({ fontSize }) => fontSize || '24px'};
  box-sizing: border-box;
  border: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
  outline: none;
  padding-bottom: 8px;
  ::placeholder {
    color: var(--unselected-color);
  }
  font-weight: 600;
`;
const InputInfo = styled.div`
  font-size: 16px;
  color: ${({ infoState }) =>
    infoState === 'error'
      ? 'var(--error-color)'
      : infoState === 'success'
      ? 'black'
      : 'var(--unselected-color)'};
  font-weight: 700;
`;

const Input = ({
  text,
  inputInfo,
  infoState,
  infoText,
  onChange,
  type,
  onClick,
  fontSize,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  // const displayValue =
  //   type === 'password' && inputValue.length > 0
  //     ? `${'*'.repeat(inputValue.length - 1)}${inputValue.slice(-1)}`
  //     : text;

  const handleFocus = () => {
    setShowCalendar(true);
  };
  const handleBlur = () => {
    setShowCalendar(false);
  };

  return (
    <InputWrapper>
      <InputStyled
        type={type}
        id="input-styled"
        placeholder={inputInfo}
        value={text}
        onChange={handleChange}
        onClick={onClick}
        fontSize={fontSize}
      />
      <InputInfo infoState={infoState}>{infoText}</InputInfo>
    </InputWrapper>
  );
};
export default Input;
