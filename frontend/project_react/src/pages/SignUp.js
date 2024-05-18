// SignUp.js
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './sign-up.css';
import StepId from '../components/SignUp/StepId';
import StepPassword from '../components/SignUp/StepPassword';
import StepName from '../components/SignUp/StepName';
import StepBirth from '../components/SignUp/StepBirth';
import StepGender from '../components/SignUp/StepGender';
import StepAddress from '../components/SignUp/StepAddress';
import StepNum from '../components/SignUp/StepNum';
import StepNumEmergency from '../components/SignUp/StepNumEmergency';
import StepMedicine from '../components/SignUp/StepMedicine';
import { authApi } from '../api/apis/authApis';
import { medicineApis } from '../api/apis/medicineApis';
import Button from '../components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { memberApis } from '../api/apis/memberApis';
import { useCookies } from 'react-cookie';

const SignUpWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  box-sizing: border-box;
`;

const SignUpTitle = styled.div`
  font-size: 40px;
  align-self: flex-start;
  font-weight: 600;
`;

const StepWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
const SignUpFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ButtonSpace = styled.div`
  height: 40px;
  width: 100%;
`;

const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
  font-weight: 500;
`;
const LoginButton = styled.span`
  color: var(--primary-color);
  cursor: pointer;
`;

const SignUp = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const locationState = location.state;
      if (!locationState.isKaKao) {
        setUserId(location.state.userId);
        setPassword(location.state.password);
      }
      setIsFirstLogin(true);
      medicineApis.getList(cookies.accessToken).then((res) => {
        setMedicineList(res.data);
      });
      setTimeout(() => {
        sliderRef.current.slickGoTo(2); // 2번째 슬라이드(0-indexed)로 이동
      }, 0);
    }
  }, []);

  const [userId, setUserId] = useState('');
  const [idPossible, setIdPossible] = useState(false);
  const [password, setPassword] = useState('');
  const [pwPossible, setPwPossible] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [birthPossible, setBirthPossible] = useState(false);
  const [gender, setGender] = useState(0);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [numPossible, setNumPossible] = useState(false);
  const [emergencyNum, setEmergencyNum] = useState('');
  const [medicineList, setMedicineList] = useState([]);
  const [openMedicineModal, setOpenMedicineModal] = useState(false);
  const [medicine, setMedicine] = useState('');
  const [cycleMorning, setCycleMorning] = useState(false);
  const [cycleLunch, setCycleLunch] = useState(false);
  const [cycleDinner, setCycleDinner] = useState(false);

  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이더 페이지(인덱스) 상태
  function formatDate(date) {
    const year = date.getFullYear(); // 년도를 가져옵니다.
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate(); // 일을 가져옵니다.

    // 월과 일이 10보다 작으면 앞에 '0'을 붙여 두 자리로 만듭니다.
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`; // 포맷에 맞게 문자열을 반환합니다.
  }

  const firstSignUp = async () => {
    await authApi
      .signUp({
        loginId: userId,
        loginPassword: password,
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: '회원가입 성공',
            text: '로그인 페이지로 이동합니다.',
            icon: 'success',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              navigate('/');
            }
          });
        } else if (res.status === 400) {
          Swal.fire({
            title: '회원가입 실패',
            text: '이미 존재하는 계정입니다.',
            type: 'error',
            confirmButtonText: '확인',
          });
        } else {
          Swal.fire({
            title: '회원가입 실패',
            text: '다시 시도해주세요.',
            type: 'error',
            confirmButtonText: '확인',
          });
        }
      });
  };
  const registerMember = async () => {
    const authToken = cookies.accessToken;
    await memberApis
      .register(
        {
          name: name,
          birthday: formatDate(birth),
          gender: gender === 1 ? 'MALE' : 'FEMALE',
          address: address,
          detailAddress: detailAddress,
          phoneNumber: phoneNum,
          guardianNumber: emergencyNum,
        },
        authToken,
      )
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            title: '회원가입 성공',
            text: '로그인 페이지로 이동합니다.',
            icon: 'success',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              navigate('/');
            }
          });
        } else if (res.status === 400) {
          Swal.fire({
            title: '회원가입 실패',
            text: '이미 존재하는 계정입니다.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        } else {
          Swal.fire({
            title: '회원가입 실패',
            text: '다시 시도해주세요.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        }
      });
  };

  const handlePrev = () => {
    if (currentSlide === 0 || currentSlide === 2) {
      navigate('/');
    } else {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = async () => {
    if (currentSlide === 1) {
      await firstSignUp();
    } else if (currentSlide === 8) {
      await registerMember();
    } else {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next), // 다음 슬라이드 인덱스 업데이트
    arrows: false,
    draggable: false,
    swipe: false, // 모바일 스와이프 비활성화
    speed: 200, // 넘어가는 시간
  };

  const canGoNext = () => {
    switch (currentSlide) {
      case 0:
        return idPossible;
      case 1:
        return pwPossible;
      case 2:
        return name.length > 0;
      case 3:
        return birthPossible;
      case 4:
        return gender !== 0;
      case 5:
        return address.length > 0;
      case 6:
        return numPossible;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (isFirstLogin) {
      sliderRef.current.slickGoTo(2);
    }
  }, []);

  const resetMedicine = () => {
    setMedicine('');
    setCycleMorning(false);
    setCycleLunch(false);
    setCycleDinner(false);
  };

  const handleCycle = (cycle) => {
    const cycleList = ['아침', '점심', '저녁'];
    const newCycle = [];
    for (let i = 0; i < cycleList.length; i++) {
      if (cycle[i]) {
        newCycle.push(cycleList[i]);
      }
    }
    return newCycle;
  };
  const registerMedicine = async (medicineInfo) => {
    await medicineApis
      .register(
        {
          medicineName: medicineInfo.medicine,
          medicineTime: handleCycle(medicineInfo.cycle),
        },
        cookies.accessToken,
      )
      .then(async (res) => {
        if (res.status === 200) {
          await getMedicineList();
          Swal.fire({
            title: '약품 추가 성공',
            text: '약품이 추가되었습니다.',
            icon: 'success',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              return true;
            }
          });
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          Swal.fire({
            title: '약품 추가 실패',
            text: '약품 추가에 실패했습니다.',
            icon: 'error',
            confirmButtonText: '확인',
          }).then((res) => {
            if (res.isConfirmed) {
              return false;
            }
          });
        }
      });
  };

  const getMedicineList = async () => {
    const authToken = cookies.accessToken;
    await medicineApis.getList(authToken).then((res) => {
      setMedicineList(res.data);
    });
  };

  const addMedicine = async () => {
    if (medicine.length === 0) {
      return;
    } else if (medicine.length < 3 || medicine.length > 20) {
      Swal.fire({
        title: '약품 이름',
        text: '약품 이름은 3자 이상 20자 이하로 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }

    const newMedicineInfo = {
      medicine: medicine,
      cycle: [cycleMorning, cycleLunch, cycleDinner],
    };
    await registerMedicine(newMedicineInfo);

    // setMedicineList([...medicineList, newMedicineInfo]);
    resetMedicine();
  };

  return (
    <SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <StepWrapper>
        <Slider id="slider" ref={sliderRef} {...settings}>
          <StepId
            value={userId}
            setValue={setUserId}
            setIdPossible={setIdPossible}
          />
          <StepPassword
            value={password}
            setValue={setPassword}
            secondValue={passwordCheck}
            setSecondValue={setPasswordCheck}
            setPwPossible={setPwPossible}
            pwPossible={pwPossible}
          />
          <StepName value={name} setValue={setName} />
          <StepBirth
            value={birth}
            setValue={setBirth}
            setBirthPossible={setBirthPossible}
          />
          <StepGender value={gender} setValue={setGender} />
          <StepAddress
            value={address}
            setValue={setAddress}
            secondValue={detailAddress}
            setSecondValue={setDetailAddress}
          />
          <StepNum
            value={phoneNum}
            setValue={setPhoneNum}
            setNumPossible={setNumPossible}
          />
          <StepNumEmergency value={emergencyNum} setValue={setEmergencyNum} />
          <StepMedicine
            value={medicine}
            setValue={setMedicine}
            cycleMorning={cycleMorning}
            setCycleMorning={setCycleMorning}
            cycleLunch={cycleLunch}
            setCycleLunch={setCycleLunch}
            cycleDinner={cycleDinner}
            setCycleDinner={setCycleDinner}
            medicineList={medicineList}
            setMedicineList={setMedicineList}
            openMedicineModal={openMedicineModal}
            setOpenMedicineModal={setOpenMedicineModal}
          />
        </Slider>
      </StepWrapper>
      <SignUpFooter>
        {currentSlide === 8 ? (
          medicineList.length > 0 && medicine.length === 0 ? (
            <Button
              text="추가한 약품"
              size="Large"
              height="Short"
              type="Primary"
              onClick={() => setOpenMedicineModal(true)}
            />
          ) : (
            <Button
              text="약품 추가"
              size="Large"
              height="Short"
              type="Primary"
              onClick={() => addMedicine()}
            />
          )
        ) : (
          <ButtonSpace />
        )}
        <ButtonWrapper>
          <Button
            text={currentSlide === 0 || currentSlide === 2 ? '취소' : '이전'}
            size="Large"
            height="Tall"
            type="Back"
            onClick={handlePrev}
          />
          <Button
            text={currentSlide === 8 || currentSlide === 1 ? '완료' : '다음'}
            size="Large"
            height="Tall"
            type="Primary"
            onClick={handleNext}
            disabled={!canGoNext()}
          />
        </ButtonWrapper>
        <FooterText>
          이미 계정이 있으신가요?{' '}
          <LoginButton
            onClick={() => {
              navigate('/');
            }}
          >
            로그인
          </LoginButton>
        </FooterText>
      </SignUpFooter>
    </SignUpWrapper>
  );
};
export default SignUp;
