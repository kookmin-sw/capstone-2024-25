import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Chatbot = () => {
  return (
    <ChatbotContainer>
      <ChatbotHeader />
    </ChatbotContainer>
  );
};

export default Chatbot;
