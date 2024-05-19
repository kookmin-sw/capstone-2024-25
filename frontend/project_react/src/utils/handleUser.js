import { myPagaApis } from '../api/apis/myPagaApis';
import Swal from 'sweetalert2';
import useStore from '../stores/store';

export const getUserInfo = async (
  accessToken,
  setUserInfo,
  setUserName,
  setGender,
) => {
  const store = useStore.getState(); // Zustand 스토어에서 상태를 직접 가져오기
  const selectedAvatar = store.selectedAvatar; // 현재 선택된 아바타 타입 가져오기
  const setSelectedAvatar = store.setSelectedAvatar; // 선택된 아바타 타입 설정 함수 가져오기
  await myPagaApis.getInfo(accessToken).then((res) => {
    console.log('getUserInfo', res.data);
    if (res.status === 200) {
      if (setUserInfo) {
        setUserInfo(res.data);
      }
      if (setUserName) {
        setUserName(res.data.name);
      }
      if (setGender) {
        setGender(res.data.gender);
      }
      if (res.data.chatProfileImageUrl) {
        if (
          res.data.chatProfileImageUrl ===
          'https://allbom.s3.ap-northeast-2.amazonaws.com/chat_female.jpg'
        ) {
          setSelectedAvatar('GIRL');
        } else {
          setSelectedAvatar('BOY');
        }
      }
    }
  });
};

export const updateBirthday = async (
  date,
  accessToken,
  setUserInfo,
  setDateModalState,
) => {
  await myPagaApis
    .updateBirthday({ birthday: date }, accessToken)
    .then(async (res) => {
      if (res.status === 204) {
        await getUserInfo(accessToken, setUserInfo);
        setDateModalState(false);
      } else {
        Swal.fire({
          title: '생년월일 수정',
          text: '생년월일 수정에 실패했습니다. 잠시 후 다시 시도해주세요.',
          icon: 'warning',
          confirmButtonText: '확인',
        });
        return;
      }
    });
};

export const updateNum = async (numValue, accessToken, setEditNum, numRef) => {
  await myPagaApis
    .updateNumber({ phoneNumber: numValue }, accessToken)
    .then((res) => {
      if (res.status === 204) {
        setEditNum(false);
      } else {
        Swal.fire({
          title: '전화 번호',
          text: '전화번호 수정에 실패했습니다. 잠시 후 다시 시도해주세요.',
          type: 'warning',
          confirmButtonText: '확인',
        }).then((res) => {
          if (res.isConfirmed) {
            numRef.current.focus();
          }
        });
      }
    });
};

export const calculateAge = (birthdate) => {
  const birthday = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

export const formatDate = (dateString, type) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (type === 'format') {
    // 페이지에 보여지는 값
    return `${year}년 ${month}월 ${day}일`;
  } else if (type === 'update') {
    // api 호출에 사용되는 값
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`; // 포맷에 맞게 문자열을 반환합니다.
  }
};
