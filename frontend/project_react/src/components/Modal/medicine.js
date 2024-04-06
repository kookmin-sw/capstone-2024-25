// medicine.js
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button';
import Toggle from '../Toggle';
import { useEffect, useState } from 'react';
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
  overflow-x: hidden;
  overflow-y: scroll;
`;
const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 25%;
  width: 100%;
  max-width: 100%;
  border-bottom: 2px solid var(--unselected-color);
  padding-bottom: 20px;
  overflow-x: hidden;
`;

const MedicineHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MedicineInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`;
const MedicineName = styled.span`
  font-size: 20px;
`;

const ModifyWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const EditBtn = styled.span`
  color: var(--select-color);
`;
const DeleteBtn = styled.span`
  color: var(--error-color);
`;
const CompleteBtn = styled.span`
  color: var(--primary-color);
`;
const CycleWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 20px;
`;
const InputWrapper = styled.div`
  overflow-x: hidden;
`;
const EditName = styled.input`
  align-self: flex-start;
  width: 160px;
  font-size: 20px;
  border: none;
  outline: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
`;

const MedicineModal = ({ isOpen, closeModal, value, setValue, showModal }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newValue, setNewValue] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (showModal) {
      setNewValue([...value]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingIndex !== null) {
      setEditingName(newValue[editingIndex].medicine);
    }
  }, [editingIndex, value]);

  const handleToggle = (index, cycleIndex) => {
    setIsChanged(true);
    const updatedValue = newValue.map((item, idx) => {
      if (idx === index) {
        const updatedCycle = [...item.cycle];
        updatedCycle[cycleIndex] = !updatedCycle[cycleIndex];
        return { ...item, cycle: updatedCycle };
      }
      return item;
    });
    setNewValue(updatedValue);
  };

  const handleNameChange = (event) => {
    setIsChanged(true);
    setEditingName(event.target.value);
  };
  const deleteBtn = (index) => {
    Swal.fire({
      title: '약품 삭제',
      text: `[${newValue[index].medicine}]를 삭제하시겠습니까 ?`,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteItem(index);
      } else {
        return;
      }
    });
  };

  const deleteItem = (index) => {
    setIsChanged(true);
    const updateValue = [...newValue];
    updateValue.splice(index, 1);
    setNewValue(updateValue);
    setValue([...updateValue]);
  };

  const saveBtn = () => {
    if (editingName.length < 3 || editingName.length > 20) {
      Swal.fire({
        title: '약품 이름',
        text: '약품 이름은 3자 이상 20자 이하로 입력해주세요.',
        confirmButtonText: '확인',
      }).then((res) => {
        if (res.isConfirmed) {
          setEditingIndex(null);
          return;
        }
      });
    } else {
      saveEdit();
    }
  };

  const saveEdit = () => {
    if (
      newValue[editingIndex].medicine !== editingName ||
      !Object.is(newValue[editingIndex].cycle, value[editingIndex].cycle)
    ) {
      applyName();
      setValue([...newValue]);
      setEditingIndex(null);
    } else {
      // 수정사항 없음
      setEditingIndex(null);
    }
  };

  const modalContentWidth =
    document.getElementById('modal-content')?.clientWidth;
  const modifyWrapperWidth =
    document.getElementById('modify-wrapper')?.clientWidth;
  useEffect(() => {
    const inputWidth = editingName.trim().length * 20;
    if (
      document.getElementById('edit-name') &&
      modalContentWidth >= modifyWrapperWidth + 12 + inputWidth
    ) {
      document.getElementById('edit-name').style.width = `${inputWidth}px`;
    }
  }, [editingName, editingIndex]);

  const applyName = () => {
    if (editingName) {
      const updatedValue = [...newValue];
      updatedValue[editingIndex].medicine = editingName;
      setNewValue(updatedValue);
    }
  };

  return (
    <Modal isOpen={isOpen} style={customModalStyles}>
      <ModalHeader>
        <ModalTitle>추가한 약품</ModalTitle>
        <XBtn
          src={process.env.PUBLIC_URL + '/images/x-img.svg'}
          onClick={() => closeModal()}
        />
      </ModalHeader>
      <ModalContent id="modal-content">
        {newValue.map((item, index) => (
          <MedicineItem key={index}>
            <MedicineInfo id="medicine-info">
              <MedicineHeader>
                {editingIndex === index ? (
                  <InputWrapper>
                    <EditName
                      id="edit-name"
                      type="text"
                      value={editingName}
                      onChange={handleNameChange}
                    />
                  </InputWrapper>
                ) : (
                  <MedicineName>{item.medicine}</MedicineName>
                )}
                <ModifyWrapper id="modify-wrapper">
                  {editingIndex === index ? (
                    <CompleteBtn
                      onClick={() => {
                        saveBtn();
                      }}
                    >
                      완료
                    </CompleteBtn>
                  ) : (
                    <EditBtn
                      onClick={() => {
                        setEditingIndex(index);
                      }}
                    >
                      수정
                    </EditBtn>
                  )}
                  <DeleteBtn
                    onClick={() => {
                      deleteBtn(index);
                    }}
                  >
                    삭제
                  </DeleteBtn>
                </ModifyWrapper>
              </MedicineHeader>
              <CycleWrapper id="cycle-wrapper">
                {['아침', '점심', '저녁'].map((part, cycleIndex) => (
                  <Toggle
                    key={`${index}-${cycleIndex}`}
                    text={part}
                    size="RectSmall"
                    selected={newValue[index].cycle[cycleIndex]}
                    onClick={() => {
                      setEditingIndex(index);
                      handleToggle(index, cycleIndex);
                    }}
                  />
                ))}
              </CycleWrapper>
            </MedicineInfo>
          </MedicineItem>
        ))}
      </ModalContent>
      <Button
        id="close-btn"
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
