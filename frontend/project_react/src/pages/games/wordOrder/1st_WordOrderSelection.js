import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import GamePageHeader from "../../../components/Header/GamePageHeader";

export default function WordOrderSelection() {
    const navigate = useNavigate();

    return (
        <Frame>
            <GamePageHeader showBackButton={true}></GamePageHeader>
            <p>문장 순서 맞추기 선택</p>
            <Button onClick={() => navigate("/game/wordOrderIntro")}>인트로</Button>
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

const Button = styled.button`
  padding: 4px;
  margin: 4px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: darkgray;
  border: none;
  border-radius: 5px;
`;