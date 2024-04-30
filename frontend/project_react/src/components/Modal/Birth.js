import Modal from 'react-modal';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';
import { ko } from 'date-fns/locale';

const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '80%',
    height: '520px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'auto',
  },
};
const ModalHeader = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalTitle = styled.div`
  font-size: 24px;
`;
const XBtn = styled.img`
  position: absolute;
  width: 24px;
  right: 0;
  top: 0;
`;
const ModalContent = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .rdp-caption_label {
    background-color: red !important;
  }
`;

const DateInfo = styled.p`
  font-size: 24px;
`;
const ContentFooter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const BirthModal = ({ isOpen, closeModal, setBirth, birth, formatDate }) => {
  const [selectedDay, setSelectedDay] = useState(birth);

  const dayPickerRef = useRef(null); // 1단계: Ref 객체 생성

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const xClick = () => {
    setBirth(null);
    closeModal();
  };
  const btnClick = () => {
    setBirth(selectedDay);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
    >
      <ModalHeader>
        <ModalTitle>생년월일</ModalTitle>
        <XBtn
          src={process.env.PUBLIC_URL + '/images/x-img.svg'}
          onClick={xClick}
        />
      </ModalHeader>
      <ModalContent ref={dayPickerRef}>
        <DayPicker onDayClick={handleDayClick} locale={ko} />
        <ContentFooter>
          <DateInfo>{formatDate(selectedDay?.toString())}</DateInfo>
          <Button
            text="선택 완료"
            size="Large"
            height="Short"
            type="Primary"
            onClick={btnClick}
          />
        </ContentFooter>
      </ModalContent>
    </Modal>
  );
};
export default BirthModal;
