// Input/index.js

import styled from 'styled-components';
import { useState } from 'react';

import BirthModal from '../Modal/birth';

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
`;
const CalendarIcon = styled.img`
  position: absolute;
  right: 0;
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

const Input = ({
  text,
  inputInfo,
  infoState,
  infoText,
  onChange,
  type,
  onClick,
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

  const displayValue =
    type === 'password' && inputValue.length > 0
      ? `${'*'.repeat(inputValue.length - 1)}${inputValue.slice(-1)}`
      : text;

  const handleFocus = () => {
    setShowCalendar(true);
  };
  const handleBlur = () => {
    setShowCalendar(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <InputWrapper>
      <InputStyled
        placeholder={inputInfo}
        value={
          type == 'date'
            ? displayValue && formatDate(displayValue)
            : displayValue
        }
        onChange={handleChange}
        onClick={onClick}
      />
      <BirthModal
        isOpen={showCalendar}
        closeModal={handleBlur}
        birth={displayValue}
        setBirth={setInputValue}
        formatDate={formatDate}
      />
      {type == 'date' && (
        <CalendarIcon
          src={process.env.PUBLIC_URL + '/images/calendar.svg'}
          onClick={handleFocus}
        />
      )}
      <InputInfo infoState={infoState}>{infoText}</InputInfo>
    </InputWrapper>
  );
};
export default Input;
