import styled from 'styled-components';
import Bubble from './Bubble';
import Profile from './Profile';
import { useEffect } from 'react';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.type === 'System' ? 'row' : 'row-reverse'};
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: ${(props) =>
    props.type === 'System' ? 'flex-start' : 'flex-end'};
`;

const Chat = ({ text, type, isLast }) => {
  useEffect(() => {
    console.log('isLast : ', isLast);
  }, []);
  return (
    <ChatContainer type={type}>
      <Profile type={type} />
      <Bubble text={text} type={type} isLast={isLast} />
    </ChatContainer>
  );
};
export default Chat;
