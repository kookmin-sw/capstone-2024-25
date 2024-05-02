import { React, useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/Header/TitleHeader';
import { Example } from './todoTest';

export default function Nav4() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    return (
        <Frame>
            <TitleHeader title={'오늘은 이런 활동 어떠세요?'} showDivider={true}></TitleHeader>
            <CategoryDiv>
                <CategoryButton onClick={() => setSelectedCategory('전체')} $isSelected={'전체' === selectedCategory} $keyword={'전체'}>전체</CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory('운동')} $isSelected={'운동' === selectedCategory} $keyword={'운동'}>운동</CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory('성장')} $isSelected={'성장' === selectedCategory} $keyword={'성장'}>성장</CategoryButton>
            </CategoryDiv>
            <CategoryDiv>
                <CategoryButton onClick={() => setSelectedCategory('취미')} $isSelected={'취미' === selectedCategory} $keyword={'취미'}>취미</CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory('휴식')} $isSelected={'휴식' === selectedCategory} $keyword={'휴식'}>휴식</CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory('식사')} $isSelected={'식사' === selectedCategory} $keyword={'식사'}>식사</CategoryButton>
            </CategoryDiv>
            <Example />
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
`;

const CategoryDiv = styled.div`
    display: flex;
    gap: 10px;
    margin: 8px;
    width: 100%;
`;

const CategoryButton = styled.button`
  flex-grow: 1; // 가능한 한 많은 공간 차지
  border: 2px solid #808080;
  padding: 4px 0;
  border-radius: 100px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$isSelected ? 'white' : '#808080')};
  background-color: ${(props) => {
        if (props.$isSelected) {
            switch (props.$keyword) {
                case '전체':
                    return '#379237';
                case '운동':
                    return '#EF6C20';
                case '성장':
                    return '#FBC02D';
                case '취미':
                    return '#0091EA';
                case '휴식':
                    return '#8BC34A';
                case '식사':
                    return '#00ffff';
                default:
                    return '#808080';
            }
        } else {
            return 'white';
        }
    }};
`;
