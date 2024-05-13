import styled from 'styled-components';
import Bubble from './Bubble';
import Profile from './Profile';
import { useEffect } from 'react';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: flex-end;
`;

const ChatUser = ({ text, type, content }) => {
  return (
    <ChatContainer type={type}>
      <Profile type={'User'} />
      <Bubble text={text} type={type} />
    </ChatContainer>
  );
};
export default ChatUser;