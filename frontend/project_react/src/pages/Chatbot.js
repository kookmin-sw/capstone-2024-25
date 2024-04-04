// Chatbot.js

import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import ChatbotModalSecond from '../components/Modal/ChatbotSecond';
import Chat from '../components/Chatbot/Chat';
import ChatInput from '../components/Chatbot/ChatInput';
import { useState } from 'react';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid yellow;
`;

const ChatbotContent = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  padding: 0 24px;
  width: 100%;
  border: 1px solid red;
`;
const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 78px;
  border: 1px solid blue;
  box-sizing: border-box;
`;

const Chatbot = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [userText, setUserText] = useState('');
  const chatListDummy = [
    {
      id: 1,
      text: 'nope',
      type: 'System',
    },
    {
      id: 2,
      text: 'nope',
      type: 'User',
    },
    {
      id: 3,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    {
      id: 4,
      text: 'nope',
      type: 'User',
    },
    {
      id: 5,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    {
      id: 6,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'User',
    },
    {
      id: 7,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    {
      id: 8,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'User',
    },
    {
      id: 9,
      text: 'nope',
      type: 'System',
    },
    {
      id: 10,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'User',
    },
  ];

  return (
    <ChatbotContainer>
      <ChatbotHeader />
      <ChatbotModalFirst
        isOpen={isOpenFirst}
        close={() => {
          setIsOpenSecond(true);
          setIsOpenFirst(false);
        }}
      />
      <ChatbotModalSecond
        isOpen={isOpenSecond}
        handlePrev={() => {
          setIsOpenFirst(true);
          setIsOpenSecond(false);
        }}
        handleNext={() => setIsOpenSecond(false)}
      />
      {/*<button onClick={() => setIsOpenFirst(true)}>gmlgml</button>*/}
      <ChatbotContent>
        {chatListDummy.map((chat) => (
          <Chat text={chat.text} type={chat.type} key={chat.id} />
        ))}
      </ChatbotContent>
      <ChatInput userText={userText} setUserText={setUserText} />
      {/*<Footer>하단바 영역</Footer>*/}
      {/*  하단바는 플러터로 구현할 예정이므로 겹치는건 문제 없을 것이라고 판단 */}
    </ChatbotContainer>
  );
};

export default Chatbot;
