import React from "react";
import styled from 'styled-components';

const Frame = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 28px;
    background-color: aqua;
    box-sizing: border-box;
`;

export default function Test() {
    return (
        <Frame>
            <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>Test</div>
        </Frame>
    );
};