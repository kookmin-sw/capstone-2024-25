import { React, useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/Header/TitleHeader';
import { Example } from './todoTest';

const mapCategoryList = [
  [
    ['전체', '#379237'],
    ['운동', '#EF6C20'],
    ['성장', '#FBC02D'],
  ],
  [
    ['취미', '#0091EA'],
    ['휴식', '#D57AFF'],
    ['식사', '#8BC34A'],
  ],
];

export default function Nav4() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  return (
    <Frame>
      <TitleHeader
        title={'오늘은 이런 활동 어떠세요?'}
        showDivider={true}
      ></TitleHeader>
      <CategoryFrame>
        <CategoryButtonDiv>
          {mapCategoryList[0].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[1]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
        <Spacer direction="column" size="12px" />
        <CategoryButtonDiv>
          {mapCategoryList[1].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[1]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
      </CategoryFrame>
      <CardsFrame>
        {/* <Test />
        <Test />
        <Test />
        <Test />
        <Test />
        <Test />
        <Test /> */}
        <Example />
        <Example />
        <Example />
        <Example />
        <Example />
      </CardsFrame>
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
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
`;

const CardsFrame = styled.div`
  width: 100dvw;
  gap: 12px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Spacer = styled.div`
  width: ${(props) => props.direction === 'row' && props.size};
  height: ${(props) => props.direction === 'column' && props.size};
`;

const CategoryFrame = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  z-index: 1;
`;

const CategoryButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
`;

const CategoryButton = styled.button`
  flex-grow: 1; // 가능한 한 많은 공간 차지
  border: 2px solid
    ${(props) => {
      if (props.$isSelected) {
        return props.$color;
      } else {
        return '#808080';
      }
    }};
  padding: 4px 0;
  border-radius: 100px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.$isSelected ? 'white' : '#808080')};
  background-color: ${(props) => {
    if (props.$isSelected) {
      return props.$color;
    } else {
      return 'white';
    }
  }};
`;
