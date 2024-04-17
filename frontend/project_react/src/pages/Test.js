import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";


export default function Test() {
    const navigate = useNavigate();

    return (
        <Frame>
            <TestButton1 onClick={() => navigate('/test')}>버튼 테스트 페이지</TestButton1>
            <TestButton2 onClick={() => navigate('/sign-up')}>회원가입 페이지</TestButton2>
            <TestButton3 onClick={() => navigate('/game')}>게임 페이지</TestButton3>
            <TestButton4 onClick={() => navigate('/map')}>지도 페이지</TestButton4>
        </Frame>
    );
};

const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background-color: white;
    box-sizing: border-box;
    gap: 20px;
    
`;

const TestButton1 = styled.div`
    background-color: #DDFFCA;
    box-shadow: black;
    border-radius: 10px;    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-shadow: rgb(102, 102, 102) 0px 8px 6px -6px; --darkreader-inline-boxshadow: #4d5356 0px 8px 6px -6px;
    transition: transform 0.3s;

    &:active {
        background-color: #C8E6C9;
        transform: scale(0.95);
    }
`;

const TestButton2 = styled.div`
    background-color: #DDFFCA;
    box-shadow: black;
    border-radius: 10px;    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-shadow: rgb(102, 102, 102) 5px 5px 3px; --darkreader-inline-boxshadow: #4d5356 5px 5px 3px;
    transition: transform 0.3s;

    &:active {
        background-color: #C8E6C9;
        transform: scale(0.95);
    }
`;

const TestButton3 = styled.div`
    background-color: #DDFFCA;
    box-shadow: black;
    border-radius: 10px;    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-shadow: rgb(68, 68, 68) 0px 0px 5px; --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
    transition: transform 0.3s;

    &:active {
        background-color: #C8E6C9;
        transform: scale(0.95);
    }
`;

const TestButton4 = styled.div`
    background-color: #DDFFCA;
    box-shadow: black;
    border-radius: 10px;    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-shadow: rgb(68, 68, 68) 0px 0px 5px; --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
    transition: transform 0.3s;

    &:active {
        background-color: #C8E6C9;
        transform: scale(0.95);
    }
`;