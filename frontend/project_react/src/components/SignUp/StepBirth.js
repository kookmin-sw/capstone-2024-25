import styled from 'styled-components';
import Input from '../Input';
import BirthModal from '../Modal/Birth2';
import { useEffect, useState } from 'react';

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
  font-weight: 600;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid var(--secondary-unselected-color);
  padding: 0 4px 8px 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 600;
`;
const DatePlaceholder = styled.span`
  color: var(--unselected-color);
  font-weight: 600;
`;

const StepBirth = ({ value, setValue, setBirthPossible }) => {
  const [modalState, setModalState] = useState(false);
  const handleFocus = () => {
    setModalState(true);
  };
  const handleBlur = () => {
    setModalState(false);
  };
  useEffect(() => {
    if (value !== '') {
      setBirthPossible(true);
    } else {
      setBirthPossible(false);
    }
  }, [value]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <StepWrapper>
      <StepTitle>생년월일 *</StepTitle>
      <DateWrapper onClick={handleFocus}>
        {value ? (
          formatDate(value)
        ) : (
          <DatePlaceholder>생년월일을 입력해주세요</DatePlaceholder>
        )}
        <img src={process.env.PUBLIC_URL + '/images/calendar.svg'} />
      </DateWrapper>
      <BirthModal
        isOpen={modalState}
        closeModal={handleBlur}
        birth={value ? value : new Date()}
        setBirth={setValue}
        formatDate={formatDate}
      />
    </StepWrapper>
  );
};
export default StepBirth;
