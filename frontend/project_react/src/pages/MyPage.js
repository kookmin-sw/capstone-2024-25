import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import TitleHeader from '../components/Header/TitleHeader';
import BirthModal from '../components/Modal/Birth2';
import Input from '../components/Input';
import Swal from 'sweetalert2';
// import BirthModal from '../Modal/Birth2';

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
  border: 1px solid blue;
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
  border: 1px solid green;
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

const DateWrapper = styled(InputWrapper)`
  justify-content: space-between;
`;

const MyPage = () => {
  const [profileImgSrc, setProfileImgSrc] = useState(''); // 사용자 성별에 맞게
  const [genderImgSrc, setGenderImgSrc] = useState(''); // 사용자 성별에 맞게
  const [modalState, setModalState] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [numValue, setNumValue] = useState('');
  const [displayNumValue, setDisplayNumValue] = useState(''); // 사용자에게 보여지는 값 (하이픈 포함)
  const [editNum, setEditNum] = useState(false);
  const numRef = useRef('');
  useEffect(() => {
    setDateValue('Sun Apr 21 2024 17:21:08 GMT+0900 (한국 표준시)');
    setNumValue('01012345678');
    setDisplayNumValue(phoneAutoHyphen('01012345678'));
  }, []);

  const handleFocus = () => {
    setModalState(true);
  };
  const handleBlur = () => {
    setModalState(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
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
    const rawNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 것을 제거
    const formattedNumber = phoneAutoHyphen(rawNumber); // 하이픈을 추가하여 형식화
    setNumValue(rawNumber); // 하이픈이 없는 순수 숫자 저장
    setDisplayNumValue(formattedNumber); // 하이픈 포함 번호를 표시
  };

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
          <DateWrapper onClick={handleFocus}>
            {formatDate(dateValue)}
            <img src={process.env.PUBLIC_URL + '/images/calendar.svg'} />
          </DateWrapper>
          <BirthModal
            isOpen={modalState}
            closeModal={handleBlur}
            birth={dateValue ? dateValue : new Date()}
            setBirth={setDateValue}
            formatDate={formatDate}
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
        <EditItem></EditItem>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
