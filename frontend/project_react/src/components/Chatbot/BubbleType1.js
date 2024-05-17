// Bubble.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const BubbleContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  background-color: var(--primary-color);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;
const BubbleValue = styled.span`
  font-size: 16px;
  color: #ffffff;
  max-width: 230px;
  white-space: normal;
  word-break: break-all;
`;

const SpinnerImg = styled.img`
  width: 120px;
  height: 120px;
`;

const BubbleType1 = ({ content }) => {
  const [showContents, setShowContents] = useState('');

  useEffect(() => {
    if (content && content.length !== 0) {
      setShowContents(content);
    }
  }, [content]);

  return (
    <BubbleContainer>
      {showContents.length === 0 ? (
        <SpinnerImg
          src={process.env.PUBLIC_URL + '/images/Chatbot/spinner.gif'}
          alt="spinner"
        />
      ) : (
        <BubbleValue>{showContents.toString()}</BubbleValue>
      )}
    </BubbleContainer>
  );
};

export default BubbleType1;
