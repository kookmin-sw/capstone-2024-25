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

const Input = ({ text, inputInfo, infoState, infoText, onChange, type }) => {
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
      : inputValue;

  const handleFocus = () => {
    setShowCalendar(true);
  };
  const handleBlur = () => {
    setShowCalendar(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // getFullYear(), getMonth(), getDate() 메서드를 사용하여 연도, 월, 일을 가져옵니다.
    // getMonth()는 0부터 시작하므로 1을 더해주어야 합니다.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0에서 시작하기 때문에 1을 더해줍니다.
    const day = date.getDate();

    // 템플릿 문자열을 사용하여 원하는 형식으로 문자열을 조합합니다.
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <InputWrapper>
      <InputStyled
        placeholder={inputInfo}
        // value={formatDate(displayValue)}
        value={
          type == 'date'
            ? displayValue && formatDate(displayValue)
            : displayValue
        }
        onChange={handleChange}
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
