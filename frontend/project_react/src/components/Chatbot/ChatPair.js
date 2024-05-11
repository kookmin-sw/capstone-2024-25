import styled from 'styled-components';

import ChatUser from './ChatUser';
import ChatSystem from './ChatSystem';

const PairContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ChatPair = ({ qnaPairs }) => {
  return (
    <PairContainer>
      <ChatUser text={qnaPairs.question} />
      <ChatSystem content={qnaPairs.answer} type={qnaPairs.answer.type} />
    </PairContainer>
  );
};

export default ChatPair;
