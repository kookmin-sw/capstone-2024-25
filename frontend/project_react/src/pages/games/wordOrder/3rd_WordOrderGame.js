import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GamePageHeader from '../../../components/Header/GamePageHeader';
import axios from 'axios';

export default function WordOrderGame() {
  // const navigate = useNavigate();
  const [sentenceData, setSentenceData] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userSelection, setUserSelection] = useState([]);

  useEffect(() => {
    getSentence();
  }, []);

  useEffect(() => {
    console.log('userSelection:', userSelection);
    isCorrectAnswer();
  }, [userSelection]);

  function getSentence() {
    setIsLoading(true);
    axios
      .get(process.env.PUBLIC_URL + '/wordOrderDummy.json')
      .then((response) => {
        const data = response.data;
        const category = data['문학'];
        const keys = Object.keys(category);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomSentence = category[randomKey];
        let wordArr = randomSentence.split(' ');
        shuffle(wordArr);
        setSentenceData(randomSentence);
        setWordList(wordArr);
        // setinvisibleButtonList(new Array(wordArr.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // 무작위로 index 값 생성 (0 이상 i 미만)
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startNewGame() {
    setUserSelection([]);
    getSentence();
  }

  function isCorrectAnswer() {
    if (userSelection.length === wordList.length) {
      if (
        sentenceData === userSelection.map((Object) => Object['word']).join(' ')
      ) {
        setTimeout(() => {
          setTimeout(() => {
            startNewGame();
          }, 200);
          alert('정답입니다!');
        }, 200);
      }
    }
  }

  function isSelectedWord(index) {
    return userSelection.some((Object) => Object['index'] === index);
  }

  return (
    <Frame>
      <GamePageHeader showBackButton={true}></GamePageHeader>
      <p>문장 순서 맞추기</p>
      <UserSelectWords>
        {userSelection.map((Object, index) => (
          <p key={index}>{Object['word']}</p>
        ))}
      </UserSelectWords>
      <WordButtons>
        {wordList.map((word, index) => (
          <Button
            key={index}
            onClick={() => {
              setUserSelection([
                ...userSelection,
                { word: word, index: index },
              ]);
            }}
            style={{
              visibility: isSelectedWord(index) ? 'hidden' : 'visible',
            }}
          >
            {word}
          </Button>
        ))}
      </WordButtons>
      <button onClick={() => startNewGame()}>문장가져오기</button>
      <button
        onClick={() => {
          setUserSelection([]);
        }}
      >
        리셋
      </button>
      {isLoading && <p>로딩 중...</p>}
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
  gap: 20px;
`;

const UserSelectWords = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  gap: 4px;
`;

const WordButtons = styled.div`
width: 100%;
  height: 100px;
  gap: 4px;
`;

const Button = styled.button`
  padding: 4px;
  margin: 4px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: darkgray;
  border: none;
  border-radius: 5px;
`;
