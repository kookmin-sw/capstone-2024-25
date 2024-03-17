import Modal from 'react-modal';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import Button from '../Button';
import { useState } from 'react';
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
    width: '360px',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'auto',
  },
};
const ModalHeader = styled.div`
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
  right: 20px;
  top: 20px;
`;
const DateInfo = styled.p`
  font-size: 24px;
`;

const BirthModal = ({ isOpen, closeModal, setBirth, birth, formatDate }) => {
  const [selectedDay, setSelectedDay] = useState(null);
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
      contentLabel="Example Modal"
    >
      <ModalHeader>
        <ModalTitle>생년월일</ModalTitle>
        <XBtn
          src={process.env.PUBLIC_URL + '/images/x-img.svg'}
          onClick={xClick}
        />
      </ModalHeader>
      <DayPicker onDayClick={handleDayClick} locale={ko} />
      <DateInfo>{formatDate(selectedDay?.toString())}</DateInfo>
      <Button
        text="중복 확인"
        size="Large"
        height="Short"
        type="Primary"
        onClick={btnClick}
      />
    </Modal>
  );
};
export default BirthModal;