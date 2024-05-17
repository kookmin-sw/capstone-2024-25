import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import { memberApis } from '../../api/apis/memberApis';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
`;

const StepId = ({ value, setValue, setIdPossible }) => {
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const [errorState, setErrorState] = useState(0);
  const stateList = ['', 'error', 'error', 'success'];
  const infoTextList = [
    '6자 이상 12자 이내. 영문, 숫자 사용 가능',
    '이미 사용중인 아이디입니다.',
    '아이디는 6자 이상 12자 이내로 입력해주세요.',
    '사용 가능한 아이디입니다.',
  ];
  const validateId = (id) => {
    // 6자 이상 12자 이내의 문자열인지 검사
    const regex = /^[a-zA-Z0-9]{6,12}$/;
    return regex.test(id);
  };
  const checkId = () => {
    // setValue(tmp);
    if (!validateId(value)) {
      setErrorState(2);
      setIdPossible(false);
      return;
    }
    memberApis
      .duplicate(value)
      .then((res) => {
        if (res.status === 200) {
          setErrorState(3);
          setIdPossible(true);
        } else if (res.status === 400) {
          setErrorState(1);
          setIdPossible(false);
        }
      })
      .catch((err) => {
        setErrorState(1);
        setIdPossible(false);
      });
  };
  return (
    <StepWrapper>
      <StepTitle>아이디 *</StepTitle>
      <Input
        text={value}
        inputInfo="아이디를 입력해주세요"
        infoText={infoTextList[errorState]}
        infoState={stateList[errorState]}
        onChange={handleInputChange}
      />
      <Button
        text="중복 확인"
        size="Large"
        height="Short"
        type="Primary"
        onClick={() => checkId()}
      />
    </StepWrapper>
  );
};
export default StepId;
