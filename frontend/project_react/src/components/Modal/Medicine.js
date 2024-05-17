// Medicine.js
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button';
import Toggle from '../Toggle';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import { medicineApis } from '../../api/apis/medicineApis';
import { handleToggle, useAdjustInputWidth } from '../../utils/handlemedicine';

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
  font-weight: 600;
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
  overflow-y: auto; // 스크롤바 수정 필요
`;
const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 25%;
  width: 100%;
  max-width: 100%;
  border-bottom: ${(props) =>
    props.isLastItem === true ? 'none' : '2px solid var(--unselected-color)'};
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const ModifyWrapper = styled.div`
  display: flex;
  gap: 20px;
  > span {
    white-space: nowrap;
    font-weight: 600;
  }
`;

const EditBtn = styled.span`
  color: var(--select-color);
`;
const DeleteBtn = styled.span`
  color: var(--error-color);
`;
const CompleteBtn = styled.span`
  color: var(--select-color);
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
  font-weight: 600;
`;

const NoValueWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const MedicineModal = ({ isOpen, closeModal, value, setValue, showModal }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newValue, setNewValue] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const getMedicineList = async () => {
    const authToken = cookies.accessToken;
    await medicineApis.getList(authToken).then((res) => {
      setValue(res.data);
    });
  };
  const updateMedicine = async (id, data) => {
    await medicineApis.update(id, data, accessToken).then((res) => {
      if (res.status === 204) {
        getMedicineList();
        Swal.fire({
          title: '약품 수정',
          text: '약품이 수정되었습니다.',
          confirmButtonText: '확인',
          icon: 'success',
        });
      }
    });
  };

  useEffect(() => {
    if (showModal) {
      setNewValue([...value]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingIndex !== null) {
      setEditingName(newValue[editingIndex].medicineName);
    }
  }, [editingIndex, value]);

  const handleNameChange = (event) => {
    setEditingName(event.target.value);
  };
  const deleteBtn = (index, itemId) => {
    Swal.fire({
      title: '약품 삭제',
      text: `[${newValue[index].medicineName}] 을/를 삭제하시겠습니까 ?`,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteItem(itemId);
      } else {
        return;
      }
    });
  };

  const deleteItem = async (index) => {
    await medicineApis
      .delete(index, accessToken)
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            title: '약품 삭제',
            icon: 'success',
            text: '약품이 삭제되었습니다.',
            confirmButtonText: '확인',
          });

          const updateValue = [...newValue];
          updateValue.splice(index, 1);
          setNewValue(updateValue);
          getMedicineList();
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          Swal.fire({
            title: '약품 삭제',
            text: '약품 삭제에 실패했습니다.',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              return;
            }
          });
        }
      });
  };

  const saveBtn = () => {
    if (editingName.length < 3 || editingName.length > 20) {
      Swal.fire({
        title: '약품 이름',
        text: '약품 이름은 3자 이상 20자 이하로 입력해주세요.',
        confirmButtonText: '확인',
      }).then((res) => {
        if (res.isConfirmed) {
          return;
        }
      });
    } else {
      saveEdit();
    }
  };

  const saveEdit = async () => {
    // API 연결 시 -> 수정 사항 없는데 수정하려고 하면 400 에러 주의
    if (
      newValue[editingIndex].medicineName !== editingName ||
      !Object.is(
        newValue[editingIndex].medicineTime,
        value[editingIndex].medicineTime,
      )
    ) {
      applyName();
      const data = {
        medicineName: editingName,
        medicineTime: newValue[editingIndex].medicineTime,
      };
      await updateMedicine(newValue[editingIndex].id, data);
      setEditingIndex(null);
    } else {
      // 수정사항 없음
      setEditingIndex(null);
    }
  };

  useAdjustInputWidth(editingName, editingIndex); // 이름 수정 시 input 너비 조절

  const applyName = () => {
    if (editingName) {
      const updatedValue = [...newValue];
      updatedValue[editingIndex].medicineName = editingName;
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
        {newValue.length !== 0 ? (
          newValue.map((item, index) => (
            <MedicineItem
              key={item.id}
              isLastItem={index === newValue.length - 1}
            >
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
                    <MedicineName id="medicine-name">
                      {item.medicineName}
                    </MedicineName>
                  )}
                  <ModifyWrapper id="modify-wrapper">
                    {editingIndex === index ? (
                      <CompleteBtn
                        onClick={() => {
                          saveBtn();
                        }}
                      >
                        확인
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
                        deleteBtn(index, item.id);
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
                      selected={newValue[index].medicineTime.includes(part)}
                      onClick={() => {
                        setEditingIndex(index);
                        handleToggle(
                          index,
                          cycleIndex,
                          part,
                          newValue,
                          setNewValue,
                        );
                      }}
                    />
                  ))}
                </CycleWrapper>
              </MedicineInfo>
            </MedicineItem>
          ))
        ) : (
          <NoValueWrapper>추가한 약품이 없습니다!</NoValueWrapper>
        )}
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
