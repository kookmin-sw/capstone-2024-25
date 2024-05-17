import styled from 'styled-components';

import ChatUser from './ChatUser';
import ChatSystem from './ChatSystem';
import { useEffect, useState } from 'react';

const PairContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ChatPair = ({ qnaPairs, chatImg, isGame }) => {
  return (
    <PairContainer>
      <ChatUser text={qnaPairs.question} isGame={isGame} />
      <ChatSystem
        content={qnaPairs.answer}
        type={qnaPairs.type}
        chatImg={chatImg}
      />
    </PairContainer>
  );
};

export default ChatPair;
