import Modal from 'react-modal';
import { DayClickEventHandler, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import Button from '../Button';
import { useEffect, useRef, useState } from 'react';
import { ko } from 'date-fns/locale';
import { formatDate } from '../../utils/handleUser';
import Swal from 'sweetalert2';

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
    overflowX: 'hidden',
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
  font-weight: 600;
`;
const XBtn = styled.img`
  position: absolute;
  width: 24px;
  right: 0;
  top: 0;
`;
const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .rdp-caption_dropdowns {
    display: flex !important;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    //.rdp-dropdown_month {
    //  background-color: #379237 !important;
    //}
  }
`;

const DateInfo = styled.p`
  font-size: 24px;
  font-weight: 600;
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
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

const DropdownWrapper = styled.div`
  background-color: #379237 !important;
  border: 1px solid red;
  display: flex;
  gap: 8px;
  > div {
    position: relative;
  }
`;
const DropdownItem = styled.div`
  display: flex;
`;

const CustomCaptionLabel = ({
  displayYear,
  displayMonth,
  clickYear,
  clickMonth,
}) => {
  return (
    <DropdownWrapper>
      <DropdownItem onClick={() => clickYear()}>{displayYear}</DropdownItem>
      <DropdownItem onClick={() => clickMonth()}>{displayMonth}</DropdownItem>
    </DropdownWrapper>
  );
};

const BirthModal = ({
  isOpen,
  closeModal,
  setBirth,
  birth,
  saveBirth,
  defaultDate,
}) => {
  useEffect(() => {}, [birth, defaultDate]);
  const [selectedDay, setSelectedDay] = useState(birth);

  const [showYear, setShowYear] = useState(false);
  const [showMonth, setShowMonth] = useState(false);

  const toggleYear = () => {
    setShowYear(!showYear);
  };
  const toggleMonth = () => {
    setShowMonth(!showMonth);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const xClick = () => {
    if (defaultDate) {
      setBirth(defaultDate);
    } else {
      setBirth(null);
    }
    closeModal();
  };
  const btnClick = () => {
    const today = new Date();
    if (selectedDay > today) {
      Swal.fire({
        title: '생년월일을 확인해주세요',
        text: '오늘 이후의 날짜는 생년월일로 선택할 수 없습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return;
    } else {
      setBirth(selectedDay);
      if (saveBirth) {
        saveBirth(selectedDay);
      }
      closeModal();
    }
  };
  const dayPickerProps = {
    components: {
      CaptionLabel: ({ displayMonth, localeUtils }) => {
        const displayYear = displayMonth.getFullYear().toString();
        // const displayMonthFormatted =
        //   localeUtils.formatMonthTitle(displayMonth);
        return (
          <CustomCaptionLabel
            displayYear={1}
            displayMonth={12}
            clickYear={toggleYear}
            clickMonth={toggleMonth}
            showYear={showYear}
            showMonth={showMonth}
          />
        );
      },
    },
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
      <ModalContent>
        <style>{css}</style>
        <DayPicker
          captionLayout="dropdown-buttons"
          defaultMonth={defaultDate}
          fromYear={1940}
          toYear={2025}
          onDayClick={handleDayClick}
          maxDate={new Date()}
          locale={ko}
          showOutsideDays
          fixedWeeks
        />
        {/*나중에 커스텀 할 떄 필요할 수도*/}
        {/*<DayPicker {...dayPickerProps} />*/}
        <ContentFooter>
          <DateInfo>{formatDate(selectedDay?.toString(), 'format')}</DateInfo>
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
