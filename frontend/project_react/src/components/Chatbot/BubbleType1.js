// Bubble.js

import styled from 'styled-components';

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

const BubbleType1 = ({ content }) => {
  return (
    <BubbleContainer>
      <BubbleValue>{content}</BubbleValue>
    </BubbleContainer>
  );
};

export default BubbleType1;
