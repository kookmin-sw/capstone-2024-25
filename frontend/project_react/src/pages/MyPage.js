import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import TitleHeader from '../components/Header/TitleHeader';
import BirthModal from '../components/Modal/Birth2';
import Swal from 'sweetalert2';
import AddressModal from '../components/Modal/Address';
import Toggle from '../components/Toggle';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 48px 30px;
  gap: 32px;
`;

const MyPageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${(props) => props.imgSrc}) no-repeat center/cover;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const UserName = styled.div`
  font-size: 30px;
`;

const AgeWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 4px;
`;

const AgeInfo = styled.div``;

const Divder = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b4b4b4;
`;

const EditItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
  box-sizing: border-box;
`;

const EditHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EditTitle = styled.div`
  font-size: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  border-bottom: 4px solid var(--secondary-unselected-color);
  padding: 0 4px 8px 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  color: var(--unselected-color);
`;

const DateWrapper = styled(InputWrapper)`
  justify-content: space-between;
`;

const EditInfo = styled.input`
  font-size: 24px;
  width: 100%;
  border: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
  outline: none;
  padding: 4px 4px 8px 4px;
  ::placeholder {
    color: var(--unselected-color);
  }
  box-sizing: border-box;
`;

const MedicineWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto; // 스크롤바 수정 필요
  border: 2px solid var(--secondary-unselected-color);
  border-radius: 8px;
  padding: 12px 8px;
  box-sizing: border-box;
`;
const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 25%;
  width: 100%;
  max-width: 100%;
  border-bottom: ${(props) =>
    props.isLastItem === true
      ? 'none'
      : '2px solid var(--secondary-unselected-color)'};
  padding-bottom: 20px;
  overflow-x: hidden;
`;

const MedicineInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 12px;
`;

const MedicineHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MedicineName = styled.span`
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  //padding-bottom: 4px;
  //border: 1px solid red;
  box-sizing: border-box;
`;

const ModifyWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const EditBtn = styled.span`
  color: var(--select-color);
  white-space: nowrap;
`;
const DeleteBtn = styled.span`
  color: var(--error-color);
  white-space: nowrap;
`;
const CompleteBtn = styled.span`
  color: var(--primary-color);
  white-space: nowrap;
`;
const CycleWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 20px;
`;
const MedicineInputWrapper = styled.div`
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

const MyPage = () => {
  const [profileImgSrc, setProfileImgSrc] = useState(''); // 사용자 성별에 맞게
  const [genderImgSrc, setGenderImgSrc] = useState(''); // 사용자 성별에 맞게
  const [dateModalState, setDateModalState] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [numValue, setNumValue] = useState('');
  const [displayNumValue, setDisplayNumValue] = useState(''); // 사용자에게 보여지는 값 (하이픈 포함)
  const [editNum, setEditNum] = useState(false);
  const numRef = useRef('');
  const [addressModalState, setAddressModalState] = useState(false);
  const [addressValue, setAddressValue] = useState('');
  const [editDetailAddress, setEditDetailAddress] = useState(false);
  const [detailAddress, setDetailAddress] = useState('');
  // 약 수정 관련
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newValue, setNewValue] = useState([]);

  const [medicineList, setMedicineList] = useState([]);
  const dummyMedicineList = [
    {
      id: 1,
      medicine: '타이레놀',
      cycle: [true, true, true],
    },
    {
      id: 2,
      medicine: '아스피린',
      cycle: [true, false, true],
    },
  ];

  useEffect(() => {
    if (editingIndex !== null) {
      setEditingName(newValue[editingIndex].medicine);
    }
  }, [editingIndex, medicineList]);

  useEffect(() => {
    if (medicineList) {
      setNewValue([...medicineList]);
    }
  }, [medicineList]);

  useEffect(() => {
    setDateValue('Sun Apr 21 2024 17:21:08 GMT+0900 (한국 표준시)');
    setNumValue('01012345678');
    setDisplayNumValue(phoneAutoHyphen('01012345678'));
    setAddressValue('경기도 파주시 적성면 어삼로2');
    setDetailAddress('402호');
    setMedicineList(dummyMedicineList);
  }, []);

  const handleDateFocus = () => {
    setDateModalState(true);
  };
  const handleDateBlur = () => {
    setDateModalState(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };
  const saveBirth = () => {
    // API 연결 후 "생년월일 수정 요청 버튼"
    console.log('saveBirth 실행');
  };
  const saveEditNum = () => {
    if (numValue.length > 11 || numValue.length < 9) {
      Swal.fire({
        title: '전화 번호',
        text: '올바른 전화번호를 입력해주세요.',
        type: 'warning',
        confirmButtonText: '확인',
      }).then((res) => {
        if (res.isConfirmed) {
          numRef.current.focus();
        }
      });
      return;
    } else {
      setEditNum(false);
    }
  };

  const phoneAutoHyphen = (phone) => {
    return phone
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };
  const handleNumChange = (e) => {
    const rawNumber = e.target.value.replace(/[^0-9]/g, '');
    const formattedNumber = phoneAutoHyphen(rawNumber);
    setNumValue(rawNumber);
    setDisplayNumValue(formattedNumber);
  };

  const handleAddressFocus = () => {
    setAddressModalState(true);
  };
  const handleAddressBlur = () => {
    setAddressModalState(false);
  };

  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };
  const saveDetailAddress = () => {
    // API 연결 후 "생년월일 수정 요청 버튼"
    setEditDetailAddress(false);
    console.log('saveDetailAddress 실행');
  };

  const saveAddress = () => {
    // API 연결 후 "주소 수정 요청 버튼"
    console.log('saveAddress 실행');
  };

  // 약 수정
  const handleToggle = (index, cycleIndex) => {
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
    const updateValue = [...newValue];
    updateValue.splice(index, 1);
    setNewValue(updateValue);
    setMedicineList([...updateValue]);
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

  const saveEdit = () => {
    // API 연결 시 -> 수정 사항 없는데 수정하려고 하면 400 에러 주의
    if (
      newValue[editingIndex].medicine !== editingName ||
      !Object.is(newValue[editingIndex].cycle, medicineList[editingIndex].cycle)
    ) {
      applyName();
      setMedicineList([...newValue]);
      setEditingIndex(null);
    } else {
      // 수정사항 없음
      setEditingIndex(null);
    }
  };
  const applyName = () => {
    if (editingName) {
      const updatedValue = [...newValue];
      updatedValue[editingIndex].medicine = editingName;
      setNewValue(updatedValue);
    }
  };

  useEffect(() => {
    const inputWidth = editingName.trim().length * 20;
    const medicineInfo = document.getElementById('medicine-info');
    const modifyWrapper = document.getElementById('modify-wrapper');

    if (document.getElementById('edit-name')) {
      if (editingName && medicineInfo && modifyWrapper) {
        if (
          inputWidth <=
          medicineInfo.clientWidth - modifyWrapper.clientWidth - 12
        ) {
          document.getElementById('edit-name').style.width = `${inputWidth}px`;
        } else {
          document.getElementById('edit-name').style.width = `${
            medicineInfo.clientWidth - modifyWrapper.clientWidth - 12
          }px`;
        }
      }
    }
  }, [editingName, editingIndex]);

  return (
    <MyPageContainer>
      <TitleHeader title={'내 정보'} showBackButton={true} showDivider={true} />
      <MyPageContent>
        <ProfileWrapper>
          <ProfileImg
            imgSrc={
              process.env.PUBLIC_URL + 'images/MyPage/profile-user-male.svg'
            }
          />
          <ProfileInfoWrapper>
            <UserName>곽희건</UserName>
            <AgeWrapper>
              <AgeInfo>84세</AgeInfo>
              <img
                src={process.env.PUBLIC_URL + 'images/MyPage/gender-male.svg'}
              />
            </AgeWrapper>
          </ProfileInfoWrapper>
        </ProfileWrapper>
        <Divder />
        <EditItem>
          <EditTitle>생년월일</EditTitle>
          <DateWrapper onClick={handleDateFocus}>
            {formatDate(dateValue)}
            <img src={process.env.PUBLIC_URL + '/images/calendar.svg'} />
          </DateWrapper>
          <BirthModal
            isOpen={dateModalState}
            closeModal={handleDateBlur}
            birth={dateValue ? dateValue : new Date()}
            setBirth={setDateValue}
            formatDate={formatDate}
            saveBirth={saveBirth}
          />
        </EditItem>
        <EditItem>
          <EditHeader>
            <EditTitle>전화번호</EditTitle>
            {editNum ? (
              <img
                src={process.env.PUBLIC_URL + 'images/MyPage/profile-save.svg'}
                onClick={() => saveEditNum()}
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + 'images/MyPage/profile-edit.svg'}
                onClick={() => setEditNum(true)}
              />
            )}
          </EditHeader>
          {editNum ? (
            <EditInfo
              type="text"
              value={displayNumValue}
              onChange={handleNumChange}
              ref={numRef}
            />
          ) : (
            <InputWrapper>{displayNumValue}</InputWrapper>
          )}
        </EditItem>
        <EditItem>
          <EditHeader>
            <EditTitle>주소</EditTitle>
            <img
              src={process.env.PUBLIC_URL + 'images/MyPage/profile-edit.svg'}
              onClick={handleAddressFocus}
            />
          </EditHeader>
          <InputWrapper>{addressValue}</InputWrapper>
          <AddressModal
            isOpen={addressModalState}
            closeModal={handleAddressBlur}
            address={addressValue}
            setAddress={setAddressValue}
            saveAddress={saveAddress}
          />
        </EditItem>
        <EditItem>
          <EditHeader>
            <EditTitle>상세주소</EditTitle>
            {editDetailAddress ? (
              <img
                src={process.env.PUBLIC_URL + 'images/MyPage/profile-save.svg'}
                onClick={() => saveDetailAddress()}
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + 'images/MyPage/profile-edit.svg'}
                onClick={() => setEditDetailAddress(true)}
              />
            )}
          </EditHeader>
          {editDetailAddress ? (
            <EditInfo
              type="text"
              value={detailAddress}
              onChange={handleDetailAddressChange}
            />
          ) : (
            <InputWrapper>{detailAddress}</InputWrapper>
          )}
        </EditItem>
        <EditItem>
          <EditTitle>복용중인 약</EditTitle>
          <MedicineWrapper>
            {newValue.map((item, index) => (
              <MedicineItem
                key={index}
                isLastItem={index === newValue.length - 1}
              >
                <MedicineInfo id="medicine-info">
                  <MedicineHeader>
                    {editingIndex === index ? (
                      <MedicineInputWrapper>
                        <EditName
                          id="edit-name"
                          type="text"
                          value={editingName}
                          onChange={handleNameChange}
                        />
                      </MedicineInputWrapper>
                    ) : (
                      <MedicineName id="medicine-name">
                        {item.medicine}
                      </MedicineName>
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
          </MedicineWrapper>
        </EditItem>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
