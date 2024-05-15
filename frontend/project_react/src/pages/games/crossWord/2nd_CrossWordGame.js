import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import { motion } from 'framer-motion';

export default function CrossWordGame() {
  const navigate = useNavigate();

  return (
    <Frame>
      <TitleHeader showBackButton={true} title={'십자말풀이'}></TitleHeader>
      {/* <CategoryDiv>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '500' }}>
            두뇌 향상 게임
          </h2>
          <img
            src="/images/bulb.svg"
            style={{ width: '28px', height: '28px' }}
          />
        </motion.div>
        <motion.h1
          style={{ margin: '0', fontSize: '44px', fontWeight: '600' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          스무고개
        </motion.h1>
      </CategoryDiv>
      <motion.p
        style={{ fontSize: '20px', wordBreak: 'break-word' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        스무고개 게임은 질문을 통해 답을 추론하는 과정에서 뇌를 적극적으로
        사용하게 합니다. 이를 통해 기억력, 문제 해결 능력, 논리적 사고 등을
        자극하여 인지 기능을 강화할 수 있습니다. 또한, 다양한 질문을 만드는
        과정에서 창의력이 길러져, 새로운 방식으로 생각하고 문제를 해결하는 데
        도움이 됩니다.
      </motion.p> */}
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <BottomButton
          onClick={() =>
            navigate(`/game/wordOrderGame/`, { replace: true })
          }
        >
          시작하기
        </BottomButton>
      </motion.div>
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

const CategoryDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
