import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';

export default function CrossWordIntro() {
  const navigate = useNavigate();

  return (
    <Frame>
      <TitleHeader showBackButton={true}></TitleHeader>
      <p>십자말풀이</p>
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
