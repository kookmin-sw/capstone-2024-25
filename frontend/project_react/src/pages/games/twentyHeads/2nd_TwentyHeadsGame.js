import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import { motion } from 'framer-motion';
import { twentyHeadsApis } from '../../../api/apis/gameApis';
import { useAccessToken } from '../../../components/cookies';

export default function TwentyHeadsGame() {
  const navigate = useNavigate();
  const accessToken = useAccessToken();
  const [gameAnswer, setGameAnswer] = useState('바나나'); // 바나나는 예시
  const [remainingQuestions, setRemainingQuestions] = useState(20); // 20은 예시

  useEffect(() => {
    // 돔이 로드되면 getPassageData() 호출
    // 게임 시작 시, 문제 데이터를 가져오기 위함
    getPassageData();
  }, []);

  async function getPassageData() {
    try {
      const response = await twentyHeadsApis.getTwentyHeadsData(accessToken);
      console.log(response.data);
      // 만약 빈 배열이라면 게임을 다시 시작해야 하므로 postUserAnswer('') 호출
      if (response.data.qnaPairs.length === 0) {
        postUserAnswer('');
      } else {
        // 게임이 진행 내역이 존재하므로, 채팅창에 대화 내역을 출력
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postUserAnswer(userAnswer) {
    try {
      const response = await twentyHeadsApis.postUserAnswer(
        accessToken,
        userAnswer,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Frame>
      <TitleHeader showBackButton={true} title={'스무고개'}></TitleHeader>
      <AnswerDiv>
        <h1 style={{ margin: '0', fontSize: '36px', fontWeight: '600' }}>
          정답:
        </h1>
        {gameAnswer &&
          Array.from({ length: gameAnswer.length }).map((_, index) => (
            <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
              key={index}
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#cccccc',
                borderRadius: '8px',
              }}
            ></motion.div>
          ))}
      </AnswerDiv>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ margin: '0', fontSize: '28px', fontWeight: '400' }}
      >{`남은 질문 횟수: ${remainingQuestions}회`}</motion.p>
      <ChatBotDiv></ChatBotDiv>
      <div style={{ width: '100%' }}>
        <BottomButton
          onClick={() => navigate(`/game/wordOrderGame/`, { replace: true })}
        >
          시작하기
        </BottomButton>
      </div>
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
  padding: 20px;
  gap: 20px;
`;

const AnswerDiv = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const ChatBotDiv = styled.div`
  // 현식: 채팅창 부분 css! 구현을 어떻게 할지모르겠어서 일단 heigth를 100%으로 해뒀음
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: #aaaaaa 0px 0px 10px;
  --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
`;
