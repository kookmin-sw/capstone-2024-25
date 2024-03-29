import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import GamePageHeader from "../components/Header/GamePageHeader";

export default function Nav1() {
    const navigate = useNavigate();

    return (
        <FrameWithHeader>
            <GamePageHeader title={'두뇌 향상 게임'} showDivider={true}></GamePageHeader>
            <ContentFrame>
                <Contents>
                    <img src={process.env.PUBLIC_URL + '/images/bulb.svg'} alt="bulb" width="50" height="50"></img>
                    <GameINfo>정기적인 두뇌 활동은 뇌 건강 유지에 필수적입니다. 게임을 통해 두뇌를 자극하고 문제해결력, 기억력, 주의력을 향상시켜 보세요!</GameINfo>
                    <GameButton onClick={() => navigate('wordOrderSelection')}>문장 순서 맞추기</GameButton>
                    <GameButton onClick={() => navigate('crossWordIntro')}>십자말풀이</GameButton>
                    <GameButton onClick={() => navigate('twentyHeadsIntro')}>스무고개</GameButton>
                    <GameButton onClick={() => navigate('wordOrderSelection')}>문장 순서 맞추기</GameButton>
                    <GameButton onClick={() => navigate('crossWordIntro')}>십자말풀이</GameButton>
                    <GameButton onClick={() => navigate('twentyHeadsIntro')}>스무고개</GameButton>
                    <GameButton onClick={() => navigate('wordOrderSelection')}>문장 순서 맞추기</GameButton>
                    <GameButton onClick={() => navigate('crossWordIntro')}>십자말풀이</GameButton>
                    <GameButton onClick={() => navigate('twentyHeadsIntro')}>스무고개</GameButton>
                    <GameButton onClick={() => navigate('twentyHeadsIntro')}>스무고개</GameButton>
                </Contents>
            </ContentFrame>
        </FrameWithHeader>
    );
}

const FrameWithHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 30px;
`;

const ContentFrame = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
`;

const Contents = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding-top: 20px;
`;

const GameINfo = styled.p`
    font-size: 18px;
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
    box-shadow: rgb(102, 102, 102) 0px 8px 6px -6px; --darkreader-inline-boxshadow: #4d5356 0px 8px 6px -6px;
    transition: transform 0.3s;

    &:active {
        background-color: #cccccc;
        transform: scale(0.95);
    }
`;