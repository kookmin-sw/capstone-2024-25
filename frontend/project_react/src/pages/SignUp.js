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

import Button from '../components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUpWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 24px;
  box-sizing: border-box;
`;

const SignUpTitle = styled.div`
  font-size: 40px;
  align-self: flex-start;
  margin-left: 20px;
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
  margin-bottom: 20px;
  gap: 20px;
`;

const ButtonSpace = styled.div`
  height: 40px;
  width: 100%;
`;

const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
`;
const LoginButton = styled.span`
  color: var(--primary-color);
  cursor: pointer;
`;

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState(0);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emergencyNum, setEmergencyNum] = useState('');
  const [medicineList, setMedicineList] = useState([]);
  const [openMedicineModal, setOpenMedicineModal] = useState(false);
  const [medicine, setMedicine] = useState('');
  const [cycleMorning, setCycleMorning] = useState(false);
  const [cycleLunch, setCycleLunch] = useState(false);
  const [cycleDinner, setCycleDinner] = useState(false);

  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이더 페이지(인덱스) 상태
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
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

  // Kakao Login
  // const code = new URL(window.location.href).searchParams.get('code');
  // console.log('code : ', code);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // 인증 코드가 있는 경우 카카오 로그인을 처리하는 함수를 호출합니다.
    if (code) {
      console.log('gmlgml');
      kakaoLogin(code);
    } else {
      console.log('dksla');
    }
  }, []);

  // 카카오 인증 코드를 이용하여 서버에 사용자 정보 요청을 보내는 함수입니다.
  const kakaoLogin = (code) => {
    axios
      .get(`http://localhost:8080/auth/kakao/callback?code=${code}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Login successful', response.data);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  const resetMedicine = () => {
    setMedicine('');
    setCycleMorning(false);
    setCycleLunch(false);
    setCycleDinner(false);
  };

  const addMedicine = () => {
    console.log('gmlgml');
    if (medicine.length === 0) {
      console.log('durl ??');
      return;
    } else if (medicine.length < 3 || medicine.length > 20) {
      Swal.fire({
        title: '약품 이름',
        text: '약품 이름은 3자 이상 20자 이하로 입력해주세요.',
        type: 'warning',
        confirmButtonText: '확인',
      });
      return;
    } else {
      console.log('되나 ?');
    }

    const newMedicineInfo = {
      medicine: medicine,
      cycle: [cycleMorning, cycleLunch, cycleDinner],
    };
    setMedicineList([...medicineList, newMedicineInfo]);
    console.log('newMedicineInfo : ', newMedicineInfo);
    resetMedicine();
  };

  return (
    <SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <StepWrapper>
        <Slider id="slider" ref={sliderRef} {...settings}>
          <StepId value={userId} setValue={setUserId} />
          <StepPassword
            value={password}
            setValue={setPassword}
            secondValue={passwordCheck}
            setSecondValue={setPasswordCheck}
          />
          <StepName value={name} setValue={setName} />
          <StepBirth value={birth} setValue={setBirth} />
          <StepGender value={gender} setValue={setGender} />
          <StepAddress
            value={address}
            setValue={setAddress}
            secondValue={detailAddress}
            setSecondValue={setDetailAddress}
          />
          <StepNum value={phoneNum} setValue={setPhoneNum} />
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
            text={currentSlide === 0 ? '취소' : '이전'}
            size="Large"
            height="Tall"
            type="Back"
            onClick={handlePrev}
          />
          <Button
            text={currentSlide === 8 ? '완료' : '다음'}
            size="Large"
            height="Tall"
            type="Primary"
            onClick={handleNext}
          />
        </ButtonWrapper>
        <FooterText>
          이미 계정이 있으신가요?
          <LoginButton>로그인</LoginButton>
        </FooterText>
      </SignUpFooter>
    </SignUpWrapper>
  );
};
export default SignUp;
