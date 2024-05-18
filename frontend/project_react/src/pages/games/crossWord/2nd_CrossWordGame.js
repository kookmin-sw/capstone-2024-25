import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import { motion } from 'framer-motion';
import { crossWordData } from './crossWordData';
import { se } from 'date-fns/locale';

export default function CrossWordGame() {
  const navigate = useNavigate();
  const crosswordArr = new Array(7).fill(0).map(() => new Array(7).fill(''));
  const crosswordData = crossWordData[0];
  crosswordData.horizontal.forEach((quiz) => {
    for (let i = 0; i < quiz.word.length; i++) {
      crosswordArr[quiz.row][quiz.col + i] = quiz.word[i];
    }
  });
  crosswordData.vertical.forEach((quiz) => {
    for (let i = 0; i < quiz.word.length; i++) {
      crosswordArr[quiz.row + i][quiz.col] = quiz.word[i];
    }
  });
  // 십자말풀이 확인 콘솔로그
  // for (let i = 0; i < 7; i++) {
  //   console.log(crosswordArr[i]);
  // }
  const parentRef = useRef(null);
  const [size, setSize] = useState(0);
  const [selectedHorizontalExplanation, setSelectedHorizontalExplanation] =
    useState(null);
  const [selectedVerticalExplanation, setSelectedVerticalExplanation] =
    useState(null);
  const [selectedWordRadix, setSelectedWordRadix] = useState([0, 0]);
  useEffect(() => {
    // 제일 처음에 있는 단어의 뜻을 set 임시!!!!!!
    setSelectedHorizontalExplanation(crosswordData.horizontal[0].explanation);
    setSelectedVerticalExplanation(crosswordData.vertical[0].explanation);

    const updateSize = () => {
      if (parentRef.current) {
        const { clientWidth, clientHeight } = parentRef.current;
        setSize(Math.min(clientWidth, clientHeight));
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Frame>
      <TitleHeader showBackButton={true} title={'십자말풀이'}></TitleHeader>
      <SquareWrapper ref={parentRef}>
        <CrosswordDiv size={size}>
          {crosswordArr.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: 'flex', width: '100%', height: '14.2857%' }}
            >
              {row.map((item, colIndex) => (
                <button
                  disabled={item === '' ? true : false}
                  key={colIndex}
                  style={{
                    boxSizing: 'border-box',
                    width: '14.2857%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    fontSize: 22,
                    fontWeight: '600',
                    backgroundColor: item === '' ? '#8D8D8D' : 'white',
                    border:
                      selectedWordRadix[0] === rowIndex &&
                      selectedWordRadix[1] === colIndex
                        ? '4px solid red'
                        : '1px solid black',
                  }}
                  onClick={() => {
                    const horizontalExplanation = crosswordData.horizontal.find(
                      (quiz) =>
                        quiz.row === rowIndex &&
                        colIndex >= quiz.col &&
                        colIndex < quiz.col + quiz.word.length,
                    );
                    const verticalExplanation = crosswordData.vertical.find(
                      (quiz) =>
                        quiz.col === colIndex &&
                        rowIndex >= quiz.row &&
                        rowIndex < quiz.row + quiz.word.length,
                    );
                    setSelectedWordRadix([rowIndex, colIndex]);

                    if (horizontalExplanation) {
                      setSelectedHorizontalExplanation(
                        horizontalExplanation.explanation,
                      );
                      console.log(horizontalExplanation.explanation);
                    } else {
                      setSelectedHorizontalExplanation(null);
                    }
                    if (verticalExplanation) {
                      setSelectedVerticalExplanation(
                        verticalExplanation.explanation,
                      );
                      console.log(verticalExplanation.explanation);
                    } else {
                      setSelectedVerticalExplanation(null);
                    }
                  }}
                ></button>
              ))}
            </div>
          ))}
        </CrosswordDiv>
        <ExplanationDiv>
          <p style={{ margin: '0px' }}>
            {selectedHorizontalExplanation ? selectedHorizontalExplanation : ''}
          </p>
          <p style={{ margin: '0px' }}>
            {selectedVerticalExplanation ? selectedVerticalExplanation : ''}
          </p>
        </ExplanationDiv>
      </SquareWrapper>
    </Frame>
  );
}

const Frame = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const SquareWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 10px;
`;

const CrosswordDiv = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const ExplanationDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 12px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: rgb(68, 68, 68) 0px 0px 5px;
  --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
`;
