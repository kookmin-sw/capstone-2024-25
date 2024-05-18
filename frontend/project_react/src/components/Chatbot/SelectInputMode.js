// SelectInputMode.js

import styled from 'styled-components';

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid var(--unselected-color);
  border-radius: 10px;
  padding: 8px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ItemText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const SelectInputMode = ({ setSelectMode, clickVoice }) => {
  const modeVoice = () => {
    setSelectMode('voice');
    clickVoice();
  };
  return (
    <SelectWrapper>
      <SelectItem onClick={() => modeVoice()}>
        <img src={process.env.PUBLIC_URL + '/images/Chatbot/mic-icon.svg'} />
        <ItemText>음성으로 입력하기</ItemText>
      </SelectItem>
      <SelectItem onClick={() => setSelectMode('keyboard')}>
        <img
          src={process.env.PUBLIC_URL + '/images/Chatbot/keyboard-icon.svg'}
        />
        <ItemText>자판으로 입력하기</ItemText>
      </SelectItem>
    </SelectWrapper>
  );
};
export default SelectInputMode;
