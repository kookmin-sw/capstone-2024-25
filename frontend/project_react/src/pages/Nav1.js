import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../components/Header/TitleHeader';

export default function Nav1() {
  const navigate = useNavigate();

  return (
    <Frame>
      <TitleHeader title={'두뇌 향상 게임'} showDivider={true}></TitleHeader>
      <div>전구</div>
      <GameINfo>
        치매예방 게임을 하시면 두뇌 향상에 많이 도움이 됩니다 믿으시고 하루에
        10개씩 하십시오
      </GameINfo>
      <GameButton onClick={() => navigate('wordOrderSelection')}>
        문장 순서 맞추기
      </GameButton>
      <GameButton onClick={() => navigate('crossWordIntro')}>
        십자말풀이
      </GameButton>
      <GameButton onClick={() => navigate('twentyHeadsIntro')}>
        스무고개
      </GameButton>
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
  padding: 30px;
  gap: 20px;
`;

const GameINfo = styled.p`
  font-size: 17px;
  margin: 0;
`;

const GameButton = styled.div`
  width: 100%;
  height: 100px;
  background-color: #eeeeee;
  box-shadow: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(102, 102, 102) 0px 8px 6px -6px;
  --darkreader-inline-boxshadow: #4d5356 0px 8px 6px -6px;
  transition: transform 0.3s;

  &:active {
    background-color: #cccccc;
    transform: scale(0.95);
  }
`;
