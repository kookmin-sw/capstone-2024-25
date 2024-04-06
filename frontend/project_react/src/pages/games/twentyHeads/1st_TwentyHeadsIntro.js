import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import GamePageHeader from "../../../components/Header/GamePageHeader";

export default function TwentyHeadsIntro() {
    const navigate = useNavigate();

    return (
        <Frame>
            <GamePageHeader showBackButton={true}></GamePageHeader>
            <p>스무고개</p>
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