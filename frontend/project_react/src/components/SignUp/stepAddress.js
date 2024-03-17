import styled from 'styled-components';
import Input from '../Input';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import AddressModal from '../Modal/address';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  gap: 8px;
  box-sizing: border-box;
`;

const StepTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 36px;
`;

const StepAddress = ({ value, setValue }) => {
  const [detailAddress, setDetailAddress] = useState('');
  const [modalState, setModalState] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };
  const handleFocus = () => {
    setModalState(true);
  };
  const handleBlur = () => {
    setModalState(false);
  };
  return (
    <StepWrapper>
      <StepTitle>주소 *</StepTitle>
      <InputWrapper>
        <Input
          text={value}
          inputInfo="지번, 도로명, 건물명으로 검색"
          onClick={handleFocus}
          fontSize="20px"
        />
        <Input
          text={detailAddress}
          inputInfo="상세 주소를 입력해주세요."
          onChange={handleDetailAddressChange}
          fontSize="20px"
        />
        <AddressModal
          isOpen={modalState}
          closeModal={handleBlur}
          address={value}
          setAddress={setValue}
        />
      </InputWrapper>
    </StepWrapper>
  );
};
export default StepAddress;
