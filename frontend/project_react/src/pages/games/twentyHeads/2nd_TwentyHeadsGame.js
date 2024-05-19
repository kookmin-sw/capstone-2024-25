import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../../components/Header/TitleHeader';
import BottomButton from '../../../components/Game/bottomButton';
import { motion } from 'framer-motion';
import { twentyHeadsApis } from '../../../api/apis/gameApis';
import { useAccessToken } from '../../../components/cookies';
import ChatPair from '../../../components/Chatbot/ChatPair';
import Swal from 'sweetalert2';
import SelectInputMode from '../../../components/Chatbot/SelectInputMode';
import ChatSystem from '../../../components/Chatbot/ChatSystem';

import {
  XImg,
  InputVoiceWrapper,
  ChatInputWrapper,
  SendButton,
  MicImg,
  InputVoiceText,
  XImage,
  InputText,
} from '../../Chatbot';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Layout from '../../../layouts/Layout';
import { set } from 'date-fns';

export default function TwentyHeadsGame() {
  const navigate = useNavigate();
  const accessToken = useAccessToken();
  const [gameAnswer, setGameAnswer] = useState('');
  const [remainingQuestions, setRemainingQuestions] = useState(20);
  const [chattingList, setChattingList] = useState([]);
  const [avatarImg, setAvatarImg] = useState(''); // 아바타 이미지
  const [answerArray, setAnswerArray] = useState([]);
  const [bottomButtonClicked, setBottomButtonClicked] = useState(false);

  /*   ChatBot Start    */
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [selectMode, setSelectMode] = useState('select');
  const inputVoiceInfo =
    '질문을 말씀해주세요 ! \n5초 동안 말씀이 없으시면 종료됩니다.';
  const [userText, setUserText] = useState('');
  const [firstChat, setFirstChat] = useState();
  const inputsRef = useRef([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [timer, setTimer] = useState(null);
  const [initialTimer, setInitialTimer] = useState(null);
  const [isTimerFirst, setIsTimerFirst] = useState(true);

  useEffect(() => {
    // 돔이 로드되면 getPassageData() 호출
    // 게임 시작 시, 문제 데이터를 가져오기 위함
    if (!browserSupportsSpeechRecognition) {
      alert('Speech recognition not supported');
    }
    console.log('public.env.PUBLIC_URL', process.env.PUBLIC_URL);
    getPassageData();
  }, []);

  useEffect(() => {
    // 음성 인식이 활성화되어 있고, transcript가 변화할 때마다 타이머를 리셋
    if (listening) {
      setIsTimerFirst(false);
      resetTimer();
    }

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
      clearTimeout(initialTimer);
    };
  }, [transcript, listening]);

  useEffect(() => {
    // 채팅창이 변화할 때마다 스크롤을 가장 아래로 내려줌
    setTimeout(() => {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [chattingList, firstChat]);

  // 타이머를 리셋하고 새로 설정하는 함수
  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!isTimerFirst) {
          console.log('입력이 3초 동안 없어 음성 인식 중지');
          SpeechRecognition.stopListening();
          postUserAnswer(transcript);
          resetTranscript();
          setSelectMode('select');
        }
      }, 3000),
    );
  };

  // 음성 인식 시작 시 5초 타이머 설정
  const startInitialTimer = () => {
    clearTimeout(initialTimer);
    const newInitialTimer = setTimeout(() => {
      console.log('최초 5초 동안 입력 없음, 인식 중지');
      if (!transcript) {
        SpeechRecognition.stopListening();
        setSelectMode('select');
      }
    }, 5000);
    setInitialTimer(newInitialTimer);
  };

  const clickVoice = () => {
    setIsTimerFirst(true);
    SpeechRecognition.startListening({ continuous: true });
    startInitialTimer(); // 음성 인식 시작과 동시에 최초 타이머 설정
  };

  const voiceXClick = () => {
    SpeechRecognition.stopListening();
    clearTimeout(timer);
    clearTimeout(initialTimer); // 모든 타이머 종료
    resetTranscript();
    setSelectMode('select');
  };

  const handleChange = (index, event) => {
    const newValues = [...answerArray];
    newValues[index] = event.target.value;
    setAnswerArray(newValues);
  };

  const handleKeyPress = (index, event) => {
    if (event.key === 'Enter' && index < 2) {
      inputsRef.current[index + 1].focus();
    }
  };

  async function getPassageData() {
    try {
      const response = await twentyHeadsApis.getTwentyHeadsData(accessToken);
      setAvatarImg(response.data.chatProfileImageUrl);
      console.log(
        response.data,
        'qnaPairs:',
        response.data.qnaPairs,
        'qnaPairs.length:',
        response.data.qnaPairs.length,
      );
      // 대화 내역
      // 만약 빈 배열이라면 게임을 다시 시작해야 하므로 postUserAnswer('') 호출
      if (response.data.qnaPairs.length === 0) {
        // const answer = await postUserAnswer('');
        console.log('비어잇네');
        const firstPost = await twentyHeadsApis.postUserAnswer(accessToken, '');
        console.log('올봄이의 스무고개 첫 멘트:', firstPost.data);
        setGameAnswer(firstPost.data.solution);
        setAnswerArray(new Array(firstPost.data.solution.length).fill(''));
        setRemainingQuestions(firstPost.data.questionCount);
        setFirstChat(firstPost.data.answer);
      } else {
        // 게임이 진행 내역이 존재하므로, 채팅창에 대화 내역을 출력
        let chatList = response.data.qnaPairs;
        const firstChat = chatList.pop().answer;
        setChattingList(chatList.reverse());
        // console.log(response.data.qnaPairs)
        setFirstChat(firstChat);
        setGameAnswer(response.data.solution);
        setAnswerArray(new Array(response.data.solution.length).fill(''));
        setRemainingQuestions(response.data.questionCount);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postUserAnswer(userAnswer) {
    try {
      setChattingList((prev) => [
        ...prev,
        { question: userAnswer, answer: '' },
      ]);
      const response = await twentyHeadsApis.postUserAnswer(
        accessToken,
        userAnswer,
      );
      console.log('스무고개 물어봤더니 돌아온 답:', response.data);
      if (response.data.isCorrect) {
        Swal.fire({
          icon: 'success',
          title: '정답입니다!',
          showDenyButton: true,
          denyButtonText: '그만하기',
          confirmButtonText: '다음 문제',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // 페이지 전체 재렌더링
            window.location.reload();
            return;
          } else if (result.isDenied) {
            navigate(-1, { replace: true });
          }
        });
      }
      setRemainingQuestions(response.data.questionCount);
      setChattingList((prev) => {
        prev[prev.length - 1] = {
          question: userAnswer,
          answer: response.data.answer,
        };
        return [...prev];
      });

      return response.data.solution;
      // setGameAnswer(response.data.solution);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Frame>
        <TitleHeader showBackButton={true} title={'스무고개'}></TitleHeader>
        <AnswerDiv>
          <h1 style={{ margin: '0', fontSize: '36px', fontWeight: '600' }}>
            정답:
          </h1>
          {answerArray.map((answer, index) => (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#cccccc',
                borderRadius: '8px',
              }}
            >
              <input
                type="text"
                maxLength={1}
                value={answer}
                style={{
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                onChange={(e) => {
                  handleChange(index, e);
                }}
                onKeyDown={(e) => {
                  handleKeyPress(index, e);
                }}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            </motion.div>
          ))}
        </AnswerDiv>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ margin: '0', fontSize: '28px', fontWeight: '400' }}
        >
          남은 질문 횟수:
          <motion.span
            key={remainingQuestions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ marginLeft: '8px' }}
          >
            {remainingQuestions}회
          </motion.span>
        </motion.p>
        <ChatBotDiv>
          <ChattingWrapper ref={inputRef2}>
            {firstChat && (
              <ChatSystem
                content={firstChat}
                type={'qwer'}
                chatImg={avatarImg}
              />
            )}
            {chattingList.map((chat, index) => (
              <ChatPair key={index} qnaPairs={chat} chatImg={avatarImg} />
            ))}
            <div ref={inputRef}></div>
          </ChattingWrapper>
        </ChatBotDiv>
        <BottomWrapper>
          {selectMode === 'voice' && (
            <InputVoiceWrapper>
              <MicImg
                src={process.env.PUBLIC_URL + '/images/Chatbot/mic-icon.svg'}
              />
              <InputVoiceText>{transcript || inputVoiceInfo}</InputVoiceText>
              <XImg
                src={process.env.PUBLIC_URL + '/images/x-img.svg'}
                onClick={() => voiceXClick()}
              />
            </InputVoiceWrapper>
          )}
          {selectMode === 'select' && (
            <SelectInputMode
              setSelectMode={setSelectMode}
              clickVoice={clickVoice}
            />
          )}
          {selectMode === 'keyboard' && (
            <ChatInputWrapper>
              <XImage
                src={process.env.PUBLIC_URL + '/images/x-img.svg'}
                onClick={() => setSelectMode('select')}
              />
              <InputText
                type="text"
                어
                id="input-text"
                // onClick={handleViewportResize}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="대화를 입력하세요"
              />
              {userText === '' ? (
                <SendButton
                  src={process.env.PUBLIC_URL + '/images/Chatbot/mic-icon.svg'}
                />
              ) : (
                <SendButton
                  onClick={() => {
                    postUserAnswer(userText);
                  }}
                  src={
                    process.env.PUBLIC_URL + '/images/Chatbot/send-icon-on.svg'
                  }
                />
              )}
            </ChatInputWrapper>
          )}
        </BottomWrapper>
        <div style={{ width: '100%' }}>
          <BottomButton
            onClick={() => {
              console.log(
                'answerArray.join:',
                answerArray.join(''),
                'gameAnswer:',
                gameAnswer.length,
              );
              if (
                // bottomButtonClicked &&
                answerArray.join('').length === gameAnswer.length
              ) {
                console.log('정답 제출', answerArray.join(''));
                postUserAnswer(answerArray.join(''));
              } else {
                inputsRef.current[0].focus();
              }
            }}
            postAnswer={answerArray.join('').length === gameAnswer.length}
          >
            정답 제출하기
          </BottomButton>
        </div>
      </Frame>
    </Layout>
  );
}

const Frame = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 12px;
`;

const AnswerDiv = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
`;

const ChatBotDiv = styled.div`
  // 현식: 채팅창 부분 css! 구현을 어떻게 할지모르겠어서 일단 heigth를 100%으로 해뒀음
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: #aaaaaa 0px 0px 10px;
  --darkreader-inline-boxshadow: #33373a 0px 0px 5px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChattingWrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px; // 나중에 ChatPair 로 옮길 예정
  padding: 12px 24px 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
