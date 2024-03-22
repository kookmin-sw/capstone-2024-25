// SignUp.js
import styled from 'styled-components';
import { useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './sign-up.css';
import StepId from '../components/SignUp/stepId';
import StepPassword from '../components/SignUp/stepPassword';
import StepName from '../components/SignUp/stepName';
import StepBirth from '../components/SignUp/stepBirth';
import StepGender from '../components/SignUp/stepGender';
import StepAddress from '../components/SignUp/stepAddress';
import StepNum from '../components/SignUp/stepNum';
import StepNumEmergency from '../components/SignUp/stepNumEmergency';
import StepMedicine from '../components/SignUp/stepMedicine';

import Button from '../components/Button';

const SignUpWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  flex: 1;
  width: 100%;
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

  return (
    <SignUpWrapper>
      <SignUpTitle>회원가입</SignUpTitle>
      <StepWrapper>
        <Slider ref={sliderRef} {...settings}>
          <StepMedicine value={medicineList} setValue={setMedicineList} />
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
