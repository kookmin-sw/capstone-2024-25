import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import TitleHeader from '../components/Header/TitleHeader';
import { Card } from './todo/card';
import { todoApis } from '../api/apis/todoApis';
import ClearFrame from './todo/clear';
import { useAccessToken } from '../components/cookies';

const categoryKeywordList = {
  exercise: ['운동', 'Barbell', '#FF4500'],
  growth: ['성장', 'book', '#FF7D31'],
  hobby: ['취미', 'MusicNotes', '#FBC02D'],
  rest: ['휴식', 'ArmChair', '#0091EA'],
  eat: ['식사', 'ForkKnife', '#8BC34A'],
};

const categoryList = [
  [
    ['전체', 'overall', '#379237'],
    categoryKeywordList['exercise'],
    categoryKeywordList['growth'],
  ],
  [
    categoryKeywordList['hobby'],
    categoryKeywordList['rest'],
    categoryKeywordList['eat'],
  ],
];

export default function Nav4() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [todoList, setTodoList] = useState();
  const accessToken = useAccessToken();

  useEffect(() => {
    getAllTodo();
  }, []);

  async function getAllTodo() {
    try {
      const response = await todoApis.getAllTodo(accessToken);
      console.log(response.data);
      setTodoList(response.data);
    } catch (error) {
      console.log(error.response.data);
      setTodoList([]);
    }
  }

  async function clearTodo(type) {
    try {
      const response = await todoApis.postTodoClear(accessToken, type);
      console.log(response);
      // todoList에서 해당 type의 todo를 찾아서 isDone을 true로 변경
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.type === type ? { ...todo, isDone: true } : todo,
        ),
      );
      setTimeout(() => {
        getAllTodo(accessToken);
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  }

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
      {(() => {
        if (!todoList) {
          return null; // todoList가 아직 로드되지 않았으면 아무 것도 렌더링하지 않음
        }

        const filteredTodos = todoList.filter((todo) => {
          const category = categoryKeywordList[todo.type];
          return (
            selectedCategory === '전체' || selectedCategory === category[0]
          );
        });

        if (filteredTodos.length === 0) {
          if (selectedCategory === '전체') {
            return (
              <ClearFrame needAnimated={false}>
                모든 활동을 완료했어요!
              </ClearFrame>
            );
          } else {
            return (
              <ClearFrame
                needAnimated={false}
              >{`오늘의 ${selectedCategory} 완료!`}</ClearFrame>
            );
          }
        }

        return (
          <CardsFrame>
            {filteredTodos.map((todo, index) => {
              const category = categoryKeywordList[todo.type];

              if (todo.isDone && todo.isDone === true) {
                return (
                  <ClearFrame
                    key={index}
                    needAnimated={true}
                  >{`오늘의 ${category[0]} 완료!`}</ClearFrame>
                );
              }
              return (
                <Card
                  key={index}
                  title={category[0]}
                  imgSrc={category[1]}
                  type={todo.type}
                  color={category[2]}
                  mission={todo.routine}
                  clearTodo={() => clearTodo(todo.type)}
                />
              );
            })}
          </CardsFrame>
        );
      })()}
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
  margin-bottom: 10px;
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
