// StepMedicine.js
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Toggle from '../Toggle';
import MedicineModal from '../Modal/Medicine';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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
  font-weight: 600;
`;

const CycleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StepMedicine = ({
  value,
  setValue,
  cycleMorning,
  cycleLunch,
  cycleDinner,
  setCycleMorning,
  setCycleLunch,
  setCycleDinner,
  medicineList,
  setMedicineList,
  openMedicineModal,
  setOpenMedicineModal,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (e) => {
    // 약품 이름
    setValue(e.target.value);
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
  return (
    <StepWrapper>
      <StepItem>
        <StepTitle>복용중인 약품 (선택)</StepTitle>
        <Input text={value} inputInfo="이름" onChange={handleInputChange} />
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
      {openMedicineModal === true ? (
        <MedicineModal
          isOpen={() => setOpenMedicineModal(true)}
          closeModal={() => setOpenMedicineModal(false)}
          value={medicineList}
          setValue={setMedicineList}
          showModal={openMedicineModal}
        />
      ) : null}
    </StepWrapper>
  );
};
export default StepMedicine;
