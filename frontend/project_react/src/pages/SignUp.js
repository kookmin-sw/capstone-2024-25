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
`;
const FooterText = styled.div`
  font-size: 16px;
  color: var(--unselected-color);
  margin-top: 20px;
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
    afterChange: (current) => setCurrentSlide(current), // 현재 슬라이드 인덱스 업데이트
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
          <StepMedicine value={medicineList} setValue={setMedicineList} />
        </Slider>
      </StepWrapper>
      <SignUpFooter>
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
