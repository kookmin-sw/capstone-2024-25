import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import { useState } from 'react';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Chatbot = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(true);

  return (
    <ChatbotContainer>
      <ChatbotHeader />
      <ChatbotModalFirst
        isOpen={isOpenFirst}
        close={() => setIsOpenFirst(false)}
      />
    </ChatbotContainer>
  );
};

export default Chatbot;
