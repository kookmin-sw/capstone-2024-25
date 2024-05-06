import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Toggle from '../Toggle';
import Button from '../Button';
import Swal from 'sweetalert2';
import { medicineApis } from '../../api/apis/medicineApis';
import { useCookies } from 'react-cookie';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
  border: 2px solid var(--secondary-unselected-color);
  border-radius: 8px;
  padding: 12px 8px;
`;

const StepItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
`;

const CycleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AddMedicine = ({ getUserInfo, handlePrev, sliderRef, handleSlide }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const [medicineName, setMedicineName] = useState('');
  const [cycles, setCycles] = useState([
    { name: '아침', selected: false },
    { name: '점심', selected: false },
    { name: '저녁', selected: false },
  ]);

  const handleInputChange = (e) => {
    setMedicineName(e.target.value);
  };

  const toggleCycle = (index) => {
    setCycles(
      cycles.map((cycle, i) => {
        if (i === index) {
          return { ...cycle, selected: !cycle.selected };
        }
        return cycle;
      }),
    );
  };
  const resetInfo = async () => {
    // console.log('resetInfo 실행');
    setMedicineName('');
    setCycles([
      { name: '아침', selected: false },
      { name: '점심', selected: false },
      { name: '저녁', selected: false },
    ]);
    // if (sliderRef.current) {
    //   sliderRef.current.slickGoTo(0); // correctSlideIndex는 올바른 슬라이더 인덱스
    // }
    handleSlide();
  };
  const addMedicine = async () => {
    // console.log('addMedicine 실행');
    if (medicineName.length < 3 || medicineName.length > 20) {
      Swal.fire({
        title: '약품 이름',
        text: '약품 이름은 3자 이상 20자 이하로 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    const newCycle = cycles
      .filter((cycle) => cycle.selected)
      .map((cycle) => cycle.name);
    const newMedicineInfo = {
      medicineName: medicineName,
      medicineTime: newCycle,
    };
    await registerMedicine(newMedicineInfo);
  };

  const registerMedicine = async (newMedicineInfo) => {
    // console.log('registerMedicine 실행');

    try {
      const res = await medicineApis.register(
        newMedicineInfo,
        cookies.accessToken,
      );
      if (res.status === 200) {
        await getUserInfo();

        Swal.fire({
          title: '약품 추가 성공',
          text: '약품이 추가되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        }).then(async (result) => {
          if (result.isConfirmed) {
            await resetInfo();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: '약품 추가 실패',
        text: '약품 추가에 실패했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <StepWrapper>
      <StepItem>
        <StepTitle>복용중인 약품 (선택)</StepTitle>
        <Input
          text={medicineName}
          inputInfo="이름"
          onChange={handleInputChange}
        />
      </StepItem>
      <StepItem>
        <StepTitle>복용 주기 (선택)</StepTitle>
        <CycleWrapper>
          {cycles.map((cycle, index) => (
            <Toggle
              key={cycle.name}
              text={cycle.name}
              size="Medium"
              selected={cycle.selected}
              onClick={() => toggleCycle(index)}
            />
          ))}
        </CycleWrapper>
        <Button
          text="약품 추가"
          size="Large"
          height="Short"
          type="Primary"
          onClick={addMedicine}
        />
      </StepItem>
    </StepWrapper>
  );
};

export default AddMedicine;