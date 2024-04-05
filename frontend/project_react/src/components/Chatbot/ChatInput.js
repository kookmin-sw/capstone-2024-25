// ChatInput.js

import styled from 'styled-components';

const ChatInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  width: 100%;
  border: 1px solid green;
  box-sizing: border-box;
`;
const XImage = styled.img`
  width: 32px;
  height: 32px;
`;

const InputText = styled.input`
  flex: 1;
  height: 36px;
  border: 1px solid #b4b4b4;
  border-radius: 10px;
  outline: none;
  padding-left: 6px;
  font-size: 16px;

  &::placeholder {
    color: #787878;
  }
`;
const SendButton = styled.img`
  width: 32px;
  height: 32px;
`;
const ChatInput = ({ userText, setUserText }) => {
  const handleChanged = (e) => {
    setUserText(e.target.value);
  };
  const resetText = () => {
    document.getElementById('input-text').value = '';
    setUserText('');
  };

  return (
    <ChatInputContainer>
      <XImage
        src={process.env.PUBLIC_URL + 'images/x-img.svg'}
        onClick={() => resetText()}
      />
      <InputText
        id="input-text"
        placeholder={'대화를 입력하세요'}
        onChange={handleChanged}
      />
      {userText === '' ? (
        <SendButton
          src={process.env.PUBLIC_URL + 'images/Chatbot/send-icon-off.svg'}
        />
      ) : (
        <SendButton
          src={process.env.PUBLIC_URL + 'images/Chatbot/send-icon-on.svg'}
        />
      )}
    </ChatInputContainer>
  );
};
export default ChatInput;
