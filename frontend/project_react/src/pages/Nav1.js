import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../components/Header/TitleHeader';
import { Button } from 'react-day-picker';

export default function Nav1() {
  const navigate = useNavigate();

  return (
    <Frame>
      <TitleHeader title={'두뇌 향상 게임'} showDivider={true}></TitleHeader>
      <GameBox>
        <img
          src="/images/game/bulb.svg"
          style={{ width: '48px', height: '48px' }}
          alt="전구"
        />
        <GameInfo>
          정기적인 두뇌 활동은 뇌 건강 유지에 필수적입니다. 게임을 통해 두뇌를
          자극하고 문제해결력, 기억력, 주의력을 향상시켜 보세요!
        </GameInfo>
        <GameDiv>
          <GameButton onClick={() => navigate('wordOrderSelection')}>
            <img
              src="/images/game/wordorder2.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
              alt="문장 순서 맞추기"
            />
          </GameButton>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0px' }}>
              문장 순서 맞추기
            </h2>
            <p style={{ fontSize: '16px', margin: '0px', textAlign: 'right' }}>
              단어를 조합하여
              <br />
              올바른 문장을 만드세요
            </p>
          </div>
        </GameDiv>
        <GameDiv>
          <GameButton onClick={() => navigate('twentyHeadsIntro')}>
            <img
              src="images/game/twentyheads2.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
              alt="스무고개"
            />
          </GameButton>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0px' }}>
              스무고개
            </h2>
            <p style={{ fontSize: '16px', margin: '0px', textAlign: 'right' }}>
              20개의 질문 만으로 AI가
              <br />
              생각한 단어를 맞혀보세요
            </p>
          </div>
        </GameDiv>
        <GameDiv>
          <GameButton onClick={() => navigate('crosswordIntro')}>
            <img
              src="images/game/crossword2.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
              alt="십자말풀이"
            />
          </GameButton>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0px' }}>
              십자말풀이
            </h2>
            <p style={{ fontSize: '16px', margin: '0px', textAlign: 'right' }}>
              빈칸의 단어를 맞혀
              <br /> 격자를 완성하세요
            </p>
          </div>
        </GameDiv>
      </GameBox>
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
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const GameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  overflow-y: auto;
  padding-top: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GameInfo = styled.p`
  font-size: 18px;
  margin: 0;
  word-break: break-all;
`;

const GameDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GameButton = styled.div`
  width: 100%;
  height: 120px;
  background-color: #eeeeee;
  box-shadow: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  box-shadow: rgb(102, 102, 102) 0px 8px 20px -10px;
  --darkreader-inline-boxshadow: #4d5356 0px 8px 6px -6px;
  transition: transform 0.3s;

  &:active {
    background-color: #cccccc;
    transform: scale(0.95);
  }
`;
