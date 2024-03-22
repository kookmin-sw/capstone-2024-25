// stepMedicine.js
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Toggle from '../Toggle';
import Button from '../Button';
import MedicineModal from '../Modal/medicine';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  gap: 20px;
  box-sizing: border-box;
`;

const StepItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
`;

const CycleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 64px;
`;

const StepMedicine = ({ value, setValue, secondValue, setSecondValue }) => {
  const [medicine, setMedicine] = useState('');
  const [cycleMorning, setCycleMorning] = useState(false);
  const [cycleLunch, setCycleLunch] = useState(false);
  const [cycleDinner, setCycleDinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (e) => {
    setMedicine(e.target.value);
  };

  const handleMorning = () => {
    setCycleMorning(!cycleMorning);
  };
  const handleLunch = () => {
    setCycleLunch(!cycleLunch);
  };
  const handleDinner = () => {
    setCycleDinner(!cycleDinner);
  };
  const resetInfo = () => {
    setMedicine('');
    setCycleMorning(false);
    setCycleLunch(false);
    setCycleDinner(false);
  };
  useEffect(() => {
    console.log('only value useEffect value : ', value);
  }, [value]);
  const btnClick = () => {
    if (medicine.length === 0) return;
    const newMedicineInfo = {
      medicine: medicine,
      cycle: [cycleMorning, cycleLunch, cycleDinner],
    };
    setValue([...value, newMedicineInfo]);
    resetInfo();
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <StepWrapper>
      <StepItem>
        <StepTitle>복용중인 약품 (선택)</StepTitle>
        <Input text={medicine} inputInfo="이름" onChange={handleInputChange} />
      </StepItem>
      <StepItem>
        <StepTitle>복용 주기 (선택)</StepTitle>
        <CycleWrapper>
          <Toggle
            text="아침"
            size="Medium"
            selected={cycleMorning}
            onClick={handleMorning}
          />
          <Toggle
            text="점심"
            size="Medium"
            selected={cycleLunch}
            onClick={handleLunch}
          />
          <Toggle
            text="저녁"
            size="Medium"
            selected={cycleDinner}
            onClick={handleDinner}
          />
        </CycleWrapper>
      </StepItem>
      {showModal === true ? (
        <MedicineModal
          isOpen={() => setShowModal(true)}
          closeModal={() => setShowModal(false)}
          value={value}
          setValue={setValue}
          showModal={showModal}
        />
      ) : null}
      <ButtonWrapper>
        {value.length === 0 || medicine.length !== 0 ? (
          <Button
            text="약품 추가"
            size="Large"
            height="Short"
            type="Primary"
            onClick={btnClick}
          />
        ) : (
          <Button
            text="추가한 약품"
            size="Large"
            height="Short"
            type="Primary"
            onClick={openModal}
          />
        )}
      </ButtonWrapper>
    </StepWrapper>
  );
};
export default StepMedicine;
