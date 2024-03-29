import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export default function GamePageHeader({ title, showBackButton, showDivider}) {
    const navigate = useNavigate();

    return (
        <HeaderFrame>
            <Row>
                {showBackButton && <p onClick={() => navigate(-1, { replace: true })}>빽</p>}
                <Title>{title}</Title>
            </Row>
            {showDivider && <Divder />}
        </HeaderFrame>
    );
}

const HeaderFrame = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin: 0;
`;

const Divder = styled.div`
    width: 100%;
    height: 1px;
    background-color: black;
    opacity: 0.2;
    margin-top: 20px;
`;