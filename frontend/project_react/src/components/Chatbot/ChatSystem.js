import styled from 'styled-components';
import BubbleType1 from './BubbleType1';
import BubbleType2 from './BubbleType2';
import Bubble from './Bubble';
import Profile from './Profile';
import ProfileSystem from './ProfileSystem';
import { useEffect } from 'react';

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const ChatSystem = ({ content, type }) => {
  useEffect(() => {
    console.log('ChatSystem content : ', content);
    console.log('ChatSystem type : ', type);
  }, []);
  if (type === 'GENERAL' || type === 'WEATHER') {
    return (
      <ChatContainer>
        <Profile type={type} />
        <BubbleType1 content={content.answer} />
      </ChatContainer>
    );
  } else if (type === 'NEWS') {
    return (
      <ChatContainer>
        <Profile type={type} />
        <BubbleType2 content={content.answer} />
      </ChatContainer>
    );
  }
  // return (
  //   <ChatContainer type={type}>
  //     <Profile type={type} />
  //     <Bubble text={content.answer} type={type} />
  //   </ChatContainer>
  // );
  return null;
};
export default ChatSystem;
