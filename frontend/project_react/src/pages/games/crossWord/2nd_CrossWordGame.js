import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import { motion } from 'framer-motion';
import { crossWordData } from './crossWordData';
import Layout from '../../../layouts/Layout';
import Swal from 'sweetalert2';

export default function CrossWordGame() {
  const [crosswordArr, setCrosswordArr] = useState([]);
  const navigate = useNavigate();

  const parentRef = useRef(null);
  const [size, setSize] = useState(0);
  const [selectedHorizontalExplanation, setSelectedHorizontalExplanation] =
    useState(null);
  const [selectedVerticalExplanation, setSelectedVerticalExplanation] =
    useState(null);
  const [selectedWordRadix, setSelectedWordRadix] = useState([0, 0]);
  const [wordSegments, setWordSegments] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  // 십자말풀이 확인 콘솔로그
  // for (let i = 0; i < 7; i++) {
  //   console.log(crosswordArr[i]);
  // }
  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600); // 애니메이션이 끝난 후 흔들림 상태 초기화
  };

  function getWordSegments(segment) {
    const allWords = [
      ...crossWordData[0].horizontal,
      ...crossWordData[0].vertical,
    ]
      .map((item) => item.word)
      .join('');

    // 문자열을 한 음절씩 분리합니다.
    const syllables = allWords.split('');
    const shuffledSyllables = shuffleArray(syllables, segment);
    console.log(shuffledSyllables);
    let eightteenArr = shuffledSyllables.slice(0, 18);
    // 18개의 배열중 랜덤 하나를 segment로 바꿔줍니다.
    eightteenArr[Math.floor(Math.random() * 18)] = segment;

    // shuffledSyllables 배열에서 16개의 음절을 뽑아 반환합니다.
    return eightteenArr;
  }

  // Fisher-Yates Shuffle 알고리즘을 사용하여 음절을 랜덤으로 섞습니다.
  const shuffleArray = (array, seg) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (array[i] !== seg) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    return array;
  };

  useEffect(() => {
    // 십자 세팅
    const crosswordData = crossWordData[0];
    let tmpArr = new Array(7).fill(0).map(() => new Array(7).fill(''));
    crosswordData.horizontal.forEach((quiz) => {
      for (let i = 0; i < quiz.word.length; i++) {
        tmpArr[quiz.row][quiz.col + i] = [quiz.word[i], ''];
      }
    });
    crosswordData.vertical.forEach((quiz) => {
      for (let i = 0; i < quiz.word.length; i++) {
        tmpArr[quiz.row + i][quiz.col] = [quiz.word[i], ''];
      }
    });
    console.log(tmpArr);
    setCrosswordArr(tmpArr);

    // 제일 처음에 있는 단어의 뜻을 set 임시!!!!!!
    setSelectedHorizontalExplanation(crosswordData.horizontal[0].explanation);
    setSelectedVerticalExplanation(crosswordData.vertical[0].explanation);
    setWordSegments(getWordSegments('심'));

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

  useEffect(() => {
    if (crosswordArr.length === 0) return;
    let isEnd = true;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (crosswordArr[i][j] !== "" && crosswordArr[i][j][1] === '') {
          isEnd = false;
          break;
        }
      }
    }

    if (isEnd) {
      // 모든 단어를 맞추면 완료 메시지를 띄웁니다.
      Swal.fire({
        icon: 'success',
        title: '정답입니다!',
        showDenyButton: true,
        denyButtonText: '그만하기',
        confirmButtonText: '다음 문제',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('다음 문제로 이동');
        } else if (result.isDenied) {
          navigate(-1, { replace: true });
        }
      });
    }
  }, [crosswordArr]);

  return (
    <Layout>
      <Frame>
        <TitleHeader showBackButton={true} title={'십자말풀이'}></TitleHeader>
        <SquareWrapper ref={parentRef}>
          <CrosswordDiv
            size={size}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {crosswordArr.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: 'flex', width: '100%', height: '14.2857%' }}
              >
                {row.map((item, colIndex) => (
                  <motion.button
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
                          ? item[1] === ''
                            ? '4px solid red'
                            : '4px solid green'
                          : '1px solid black',
                    }}
                    onClick={() => {
                      setWordSegments(getWordSegments(item[0]));
                      const horizontalExplanation =
                        crossWordData[0].horizontal.find(
                          (quiz) =>
                            quiz.row === rowIndex &&
                            colIndex >= quiz.col &&
                            colIndex < quiz.col + quiz.word.length,
                        );
                      const verticalExplanation =
                        crossWordData[0].vertical.find(
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
                  >
                    {item[0] === item[1] ? item[0] : ''}
                  </motion.button>
                ))}
              </div>
            ))}
          </CrosswordDiv>
          <ExplanationDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedHorizontalExplanation && (
              <p style={{ margin: '0px', wordBreak: 'break-all' }}>
                <span style={{ fontWeight: 'bold' }}>가로: </span>
                {selectedHorizontalExplanation
                  ? selectedHorizontalExplanation
                  : ''}
              </p>
            )}
            {selectedVerticalExplanation && (
              <p style={{ margin: '0px', wordBreak: 'break-all' }}>
                <span style={{ fontWeight: 'bold' }}>세로: </span>
                {selectedVerticalExplanation ? selectedVerticalExplanation : ''}
              </p>
            )}
          </ExplanationDiv>
          <WordSegDiv>
            {wordSegments.map((word, index) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.02 }}
                onClick={() => {
                  setWordSegments((prev) => {
                    return prev.map((item, i) => (i === index ? '' : item));
                  });
                  if (
                    crosswordArr[selectedWordRadix[0]][
                      selectedWordRadix[1]
                    ][0] === word
                  ) {
                    setCrosswordArr(
                      crosswordArr.map((row, rowIndex) => {
                        return row.map((item, colIndex) => {
                          if (
                            selectedWordRadix[0] === rowIndex &&
                            selectedWordRadix[1] === colIndex
                          ) {
                            return [word, word];
                          }
                          return item;
                        });
                      }),
                    );
                  }
                }}
                key={index}
                style={{
                  width: 'calc(15% - 10px)',
                  height: 40,
                  borderRadius: 4,
                  border: '0px solid black',
                  backgroundColor: '#379237',
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                  visibility: word === '' ? 'hidden' : 'visible',
                }}
              >
                {word}
              </motion.button>
            ))}
          </WordSegDiv>
        </SquareWrapper>
      </Frame>
    </Layout>
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
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SquareWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CrosswordDiv = styled(motion.div)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const WordSegDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0px;
  margin-top: 20px;
`;

const ExplanationDiv = styled(motion.div)`
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
