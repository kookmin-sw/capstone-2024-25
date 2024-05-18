// Bubble.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const BubbleContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  background-color: ${(props) =>
    props.type === 'System' ? 'var(--primary-color)' : '#FFFFFF'};
  border: ${(props) =>
    props.type === 'System' ? 'none' : '1px solid #F1F1F1'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;
const BubbleValue = styled.span`
  font-size: 16px;
  color: ${(props) => (props.type === 'System' ? '#FFFFFF' : '#000000')};

  max-width: 230px;
  white-space: normal;
  word-break: break-all;
`;

const Bubble = ({ text, type }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [count, setCount] = useState(0);
  const completionWord = text;

  return (
    <BubbleContainer type={type}>
      <BubbleValue type={type}>{text}</BubbleValue>
    </BubbleContainer>
  );
};

export default Bubble;
