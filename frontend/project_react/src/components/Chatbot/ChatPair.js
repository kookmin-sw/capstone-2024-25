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

const ChatPair = ({ qnaPairs, chatImg }) => {
  // console.log('qnaPairs : ', qnaPairs);
  // console.log('qnaPairs.answer : ', qnaPairs.answer);
  useEffect(() => {
    console.log('qnaPairs : ', qnaPairs);
  }, [qnaPairs]);
  return (
    <PairContainer>
      <ChatUser text={qnaPairs.question} />
      <ChatSystem
        content={qnaPairs.answer}
        type={qnaPairs.type}
        chatImg={chatImg}
      />
    </PairContainer>
  );
};

export default ChatPair;
