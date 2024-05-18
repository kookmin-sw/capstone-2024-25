// Bubble.js

import styled from 'styled-components';
import Button from '../Button';
import React from 'react';

const BubbleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 8px 12px;
  background-color: var(--primary-color);
  //border: 2px solid #ffffff;
  //border: none;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  box-sizing: border-box;
  gap: 12px;
`;
const BubbleValue = styled.span`
  font-size: 16px;
  color: #ffffff;
  max-width: 230px;
  white-space: normal;
  word-break: break-all;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BubbleMoreNews = ({ clickYes, clickNo }) => {
  return (
    <BubbleContainer>
      <BubbleValue>더 많은 뉴스를 보여드릴까요 ?</BubbleValue>
      <ButtonWrapper>
        <Button
          text="예"
          size="Small"
          height="Short"
          type="Secondary"
          onClick={clickYes}
        />
        <Button
          text="아니오"
          size="Small"
          height="Short"
          type="Secondary"
          onClick={clickNo}
        />
      </ButtonWrapper>
    </BubbleContainer>
  );
};

export default BubbleMoreNews;
