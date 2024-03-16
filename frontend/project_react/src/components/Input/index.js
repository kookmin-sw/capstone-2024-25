import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const InputStyled = styled.input`
  font-size: 24px;
  border: none;
  border-bottom: 4px solid var(--secondary-unselected-color);
  outline: none;
  padding-bottom: 8px;
  ::placeholder {
    color: var(--unselected-color);
  }
`;
const InputInfo = styled.div`
  font-size: 16px;
  color: ${({ infoState }) =>
    infoState === 'error'
      ? 'var(--error-color)'
      : infoState === 'success'
      ? 'black'
      : 'var(--unselected-color)'};
`;

const Input = ({ text, inputInfo, infoState, infoText }) => {
  console.log('text : ', text);
  console.log('inputInfo : ', inputInfo);
  console.log('infoState : ', infoState);
  console.log('infoText : ', infoText);
  return (
    <InputWrapper>
      <InputStyled placeholder={inputInfo} />
      <InputInfo infoState={infoState}>{infoText}</InputInfo>
    </InputWrapper>
  );
};
export default Input;
