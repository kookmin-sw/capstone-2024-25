// medicine.js
import Modal from 'react-modal';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import Button from '../Button';
import Toggle from '../Toggle';
import { useState } from 'react';

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
    width: '300px',
    height: '420px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    overflowX: 'hidden',
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
const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;
const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid var(--unselected-color);
  padding-bottom: 20px;
`;
const MedicineInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MedicineName = styled.span`
  font-size: 20px;
`;
const DeleteBtn = styled.img``;
const SaveBtn = styled.img``;
const CycleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
const EditName = styled.input`
  align-self: flex-start;
  width: 160px;
  font-size: 20px;
  border: none;
  outline: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
`;

const MedicineModal = ({ isOpen, closeModal, value, setValue }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const handleToggle = (index, cycleIndex) => {
    const updatedMedicines = [...value];
    updatedMedicines[index].cycle[cycleIndex] =
      !updatedMedicines[index].cycle[cycleIndex];
    setValue(updatedMedicines);
  };

  const handleNameChange = (event) => {
    setEditingName(event.target.value);
  };

  const saveEdit = (index) => {
    const updatedMedicines = [...value];
    if (editingName !== '') updatedMedicines[index].medicine = editingName;
    setValue(updatedMedicines);
    setEditingIndex(null); // 편집 모드 종료
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
        setEditingIndex(null); // 모달이 닫힐 때 편집 모드 종료
      }}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <ModalHeader>
        <ModalTitle>추가한 약품</ModalTitle>
      </ModalHeader>
      <ModalContent>
        {value.map((item, index) => (
          <MedicineItem key={index}>
            <MedicineInfo>
              {editingIndex === index ? (
                <EditName
                  type="text"
                  value={editingName}
                  onChange={handleNameChange}
                />
              ) : (
                <MedicineName
                  onClick={() => {
                    setEditingIndex(index);
                    setEditingName(item.medicine);
                  }}
                >
                  {item.medicine}
                </MedicineName>
              )}
              <CycleWrapper>
                {['아침', '점심', '저녁'].map((part, cycleIndex) => (
                  <Toggle
                    key={cycleIndex}
                    text={part}
                    size="RectSmall"
                    selected={item.cycle[cycleIndex]}
                    onClick={() => handleToggle(index, cycleIndex)}
                  />
                ))}
              </CycleWrapper>
            </MedicineInfo>
            {editingIndex === index ? (
              <SaveBtn
                src={process.env.PUBLIC_URL + '/images/save.svg'}
                onClick={() => saveEdit(index)}
              />
            ) : (
              <DeleteBtn
                src={process.env.PUBLIC_URL + '/images/delete.svg'}
                onClick={() => {
                  const updatedMedicines = [...value];
                  updatedMedicines.splice(index, 1);
                  setValue(updatedMedicines);
                }}
              />
            )}
          </MedicineItem>
        ))}
      </ModalContent>
      <Button
        text="닫기"
        size="Large"
        height="Short"
        type="Primary"
        onClick={closeModal}
      />
    </Modal>
  );
};

export default MedicineModal;
