import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/Header/TitleHeader';
import { Card } from './todo/card';
import { todoApis } from '../api/apis/todoApis';

const categoryKeywordList = {
  "exercise": ['운동', 'Barbell', '#EF6C20'],
  "growth": ['성장', 'book', '#FBC02D'],
  "hobby": ['취미', 'MusicNotes', '#0091EA'],
  "rest": ['휴식', 'ArmChair', '#D57AFF'],
  "eat": ['식사', 'ForkKnife', '#8BC34A'],
}

const categoryList = [
  [
    ['전체', 'overall', '#379237'],
    categoryKeywordList["exercise"],
    categoryKeywordList["growth"],
  ],
  [
    categoryKeywordList["hobby"],
    categoryKeywordList["rest"],
    categoryKeywordList["eat"],
  ],
];

export default function Nav4() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function getAllTodo() {
      const response = await todoApis.getAllTodo();
      console.log(response.data);
      setTodoList(response.data);
    }

    getAllTodo();
  }, []);

  return (
    <Frame>
      <TitleHeader
        title={'오늘은 이런 활동 어떠세요?'}
        showDivider={true}
      ></TitleHeader>
      <CategoryFrame>
        <CategoryButtonDiv>
          {categoryList[0].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[2]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
        <Spacer direction="column" size="12px" />
        <CategoryButtonDiv>
          {categoryList[1].map((category, index) => (
            <CategoryButton
              key={index}
              $color={category[2]}
              $isSelected={selectedCategory === category[0]}
              onClick={() => setSelectedCategory(category[0])}
            >
              {category[0]}
            </CategoryButton>
          ))}
        </CategoryButtonDiv>
      </CategoryFrame>
      <CardsFrame>
        {todoList.length > 0 &&
          todoList.map((todo, index) => {
            const category = categoryKeywordList[todo.type];
            if (selectedCategory !== '전체' && selectedCategory !== category[0]) {
              return null;
            }
            return (
              <Card
                key={index}
                title={category[0]}
                imgSrc={category[1]}
                color={category[2]}
                mission={todo.routine}
              />
            );
          })}
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
  padding-top: 10px;
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
