import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import { motion } from 'framer-motion';
import Layout from '../../../layouts/Layout';

export default function CrossWordIntro() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Frame>
        <TitleHeader showBackButton={true}></TitleHeader>
        <CategoryDiv>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 style={{ margin: '0', fontSize: '24px', fontWeight: '500' }}>
              두뇌 향상 게임
            </h2>
            <img
              src="/images/game/bulb.svg"
              style={{ width: '28px', height: '28px' }}
            />
          </motion.div>
          <motion.h1
            style={{ margin: '0', fontSize: '44px', fontWeight: '600' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            십자말풀이
          </motion.h1>
        </CategoryDiv>
        <motion.p
          style={{ fontSize: '20px', wordBreak: 'break-word' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          뇌 기능을 건강하게 유지하기 위해서는 인지적으로 자극적인 활동이 꼭
          필요합니다. 십자말풀이와 같이 퍼즐을 푸는 두뇌 게임은 뇌를 자극하여
          작업 기억력을 향상시킬 수 있습니다.
        </motion.p>
        <motion.div
          style={{ width: '100%' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BottomButton
            onClick={() => navigate(`/game/crossWordGame/`, { replace: true })}
          >
            시작하기
          </BottomButton>
        </motion.div>
      </Frame>
    </Layout>
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
