import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import CategoryLabel from '../../../components/Game/categoryLabel';
import { wordOrderApis } from '../../../api/apis/gameApis';
import { useAccessToken } from '../../../components/cookies';
import BottomButton from '../../../components/Game/bottomButton';
import { motion, useAnimation } from 'framer-motion';
import Swal from 'sweetalert2';

export default function WordOrderGame() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [sentenceData, setSentenceData] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userSelection, setUserSelection] = useState([]);
  const [rotate, setRotate] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const controls = useAnimation();
  const accessToken = useAccessToken();

  useEffect(() => {
    getSentence();
  }, []);

  useEffect(() => {
    if (userSelection.length > 0) {
      // 초기 userSelection이 빈 배열이 아닐 때만 실행
      console.log('userSelection:', userSelection);
      // isCorrectAnswer();
    }
  }, [userSelection]);

  async function getSentence() {
    setIsLoading(true);
    try {
      const response = await wordOrderApis.getSentence(
        accessToken,
        category.split(',')[1],
      );
      const sentence = response.data.sentence;
      let wordArr = sentence.substring(0, sentence.length - 1).split(' ');
      shuffle(wordArr);
      setSentenceData(sentence.concat('.'));
      setWordList(wordArr);
      console.log('sentence:', response.data.sentence);
      console.log('sentenceData:', wordArr);
    } catch (error) {
      console.error('Get Sentence Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // 무작위로 index 값 생성 (0 이상 i 미만)
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function rotateImage() {
    setRotate((prev) => prev - 360);
    controls.start({
      rotate: rotate - 360,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    });
  }

  function startNewGame() {
    setUserSelection([]);
    getSentence();
  }

  async function skipQuestion() {
    try {
      const tmp = await Swal.fire({
        title: '문제 건너뛰기',
        text: '건너뛰면 다음 문제로 넘어갑니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요',
        allowOutsideClick: false,
      });
      if (tmp.isConfirmed) {
        const res = await wordOrderApis.postUserSkip(
          accessToken,
          category.split(',')[1],
        );
        console.log('res:', res.data);
        setHasFailed(false);
        startNewGame();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postUserAnswer() {
    try {
      const answer =
        userSelection.map((Object) => Object['word']).join(' ') + '.';
      console.log('answer:', answer);
      const res = await wordOrderApis.postUserAnswer(
        accessToken,
        category.split(',')[1],
        answer,
      );
      console.log('res:', res.data);
      if (res.data.isAnswer === true) {
        Swal.fire({
          icon: 'success',
          title: '정답입니다!',
          showDenyButton: true,
          denyButtonText: '그만하기',
          confirmButtonText: '다음 문제',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            startNewGame();
          } else if (result.isDenied) {
            navigate(-1, {replace: true});
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '틀렸습니다!',
          text: '다시 시도해보세요.',
          allowOutsideClick: false,
        }).then(() => {
          setHasFailed(true);
          setUserSelection([]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function isSelectedWord(index) {
    return userSelection.some((Object) => Object['index'] === index);
  }

  return (
    <Frame>
      <TitleHeader
        showBackButton={true}
        title={'문장 순서 맞추기'}
      ></TitleHeader>
      <GameFrame>
        <GameContent>
          <CategoryLabel>{category.split(',')[0]}</CategoryLabel>
          <UserSelectionDiv>
            <UserSelectWords>
              {userSelection.map((Object, index) => (
                <motion.p
                  key={index}
                  style={{
                    fontSize: '22px',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '0px',
                    marginBottom: '0px',
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 24,
                  }}
                >
                  {Object['word']}
                </motion.p>
              ))}
            </UserSelectWords>
            <motion.img
              src="/images/game/reset.svg"
              style={{ position: 'absolute', right: '10px', bottom: '10px' }}
              alt="reset"
              onClick={() => {
                rotateImage();
                setUserSelection([]);
              }}
              animate={controls}
            />
          </UserSelectionDiv>
          <h2 style={{ fontSize: '20px', fontWeight: '300', margin: '0px' }}>
            <span style={{ fontSize: '24px' }}>어휘</span>를 선택하여{' '}
            <span style={{ fontSize: '24px' }}>문장</span>을 완성하세요
          </h2>
          <WordButtons>
            {wordList.map((word, index) => (
              <Button
                key={sentenceData + index}
                onClick={() => {
                  setUserSelection([
                    ...userSelection,
                    { word: word, index: index },
                  ]);
                }}
                style={{
                  visibility: isSelectedWord(index) ? 'hidden' : 'visible',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {word}
              </Button>
            ))}
          </WordButtons>
          {isLoading && <p>로딩 중...</p>}
        </GameContent>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {hasFailed && (
            <motion.p
              style={{
                fontSize: '22px',
                fontWeight: '600',
                margin: '0px',
                color: '#2167FF',
                textDecoration: 'underline',
              }}
              onClick={skipQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2}}
            >
              문제 건너뛰기
            </motion.p>
          )}
          <BottomButton onClick={postUserAnswer}>제출하기</BottomButton>
        </div>
      </GameFrame>
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
  padding: 20px;
`;

const GameFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const GameContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  gap: 20px;
`;

const UserSelectWords = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 30px;
  gap: 4px;
`;

const UserSelectionDiv = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgb(102, 102, 102) 0px 0px 10px -2px;
  margin-top: 10px;
`;

const WordButtons = styled.div`
  width: 100%;
  gap: 4px;
`;

const Button = styled(motion.button)`
  padding: 4px 8px;
  margin: 4px;
  background-color: #808080;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;
