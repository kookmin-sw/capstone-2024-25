import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import CategoryLabel from '../../../components/Game/categoryLabel';

export default function WordOrderIntro() {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <Frame>
      <TitleHeader
        showBackButton={true}
        title={'문장 순서 맞추기'}
      ></TitleHeader>
      <CategoryDiv>
        <h1 style={{ margin: '0' }}>주제</h1>
        <CategoryLabel>{category}</CategoryLabel>
      </CategoryDiv>
      <p style={{ fontSize: '20px', wordBreak: 'break-word' }}>
        문장 순서 맞추기 게임은 뇌를 활성화시켜 인지 능력 향상에 도움을 줍니다.
        또한 다양한 문맥에서 문장을 이해하고 정렬하는 능력을 길러주고, 언어
        능력과 의사 소통 능력을 향상시킵니다.
      </p>
      <BottomButton
        onClick={() =>
          navigate(`/game/wordOrderGame/${category}`, { replace: true })
        }
      >
        시작하기
      </BottomButton>
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
