import styled from 'styled-components';
const HeaderFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--secondary-color);
  padding: 12px 0;
  box-sizing: border-box;
`;
const MyPageImg = styled.img`
  position: absolute;
  right: 0;
  top: 12px;
`;

const ChatbotHeader = ({ onClick }) => {
  return (
    <HeaderFrame onClick={onClick}>
      <img
        src={process.env.PUBLIC_URL + '/images/Chatbot/header-title.svg'}
        alt="chatbot"
      />
      <MyPageImg
        src={process.env.PUBLIC_URL + '/images/Chatbot/mypage-icon.svg'}
        alt="chatbot"
        style={{ position: 'absolute', right: '0' }}
      />
    </HeaderFrame>
  );
};

export default ChatbotHeader;
