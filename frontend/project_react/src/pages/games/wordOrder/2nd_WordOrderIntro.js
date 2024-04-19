import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import GamePageHeader from '../../../components/Header/GamePageHeader';

export default function WordOrderIntro() {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <Frame>
      <GamePageHeader
        showBackButton={true}
        title={'문장 순서 맞추기'}
      ></GamePageHeader>
      <CategoryDiv>
        <h1 style={{margin: "0"}}>주제</h1>
        <WordCategory>{category}</WordCategory>
      </CategoryDiv>
      <p style={{fontSize: "20px", wordBreak: "break-word"}}>
        문장 순서 맞추기 게임은 뇌를 활성화시켜 인지 능력 향상에 도움을 줍니다.
        또한 다양한 문맥에서 문장을 이해하고 정렬하는 능력을 길러주고, 언어
        능력과 의사 소통 능력을 향상시킵니다.
      </p>
      <StartButton
        onClick={() =>
          navigate(`/game/wordOrderGame/${category}`, { replace: true })
        }
      >
        시작하기
      </StartButton>
    </Frame>
  );
}

const Frame = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const CategoryDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WordCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  font-size: 48px;
  font-weight: bold;
  border-radius: 12px;
  border: 1px solid #000000;
  box-shadow: 0px 8px 10px -6px rgb(102, 102, 102);
`;

const StartButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-radius: 12px;
  font-size: 28px;
  font-weight: bold;
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0px 8px 6px -6px rgb(102, 102, 102);
`;
