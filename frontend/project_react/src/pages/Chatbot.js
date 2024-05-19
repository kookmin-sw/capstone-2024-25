// Chatbot.js

import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import ChatbotModalSecond from '../components/Modal/ChatbotSecond';
import Chat from '../components/Chatbot/Chat';
import ChatPair from '../components/Chatbot/ChatPair';
import Category from '../components/Toggle/Category';
import SelectInputMode from '../components/Chatbot/SelectInputMode';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { getUserInfo } from '../utils/handleUser';

import { googleTTS } from '../utils/handleChat';
import { convertArrayToObjectList } from '../utils/handleChat';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useStore from '../stores/store';

import { chatbotApis } from '../api/apis/chatbotApis';
import ChatSystem from '../components/Chatbot/ChatSystem';
import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils';
import {
  cultureRequest,
  newsRequest,
  serviceRequest,
  weatherRequest,
  reverseQnaResponses,
  parseNewsData,
} from '../utils/handleChat';
import Layout from '../layouts/Layout';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`;

const ChattingWrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px; // 나중에 ChatPair 로 옮길 예정
  padding: 12px 24px 120px 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
const DownPoint = styled.div`
  height: 1px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: #ffffff;
  border-top: 2px solid var(--unselected-color);
  padding: 8px 0;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const InputVoiceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  width: 88%;
  padding: 12px 24px;
  box-sizing: border-box;
  border: 1px solid var(--unselected-color);
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const MicImg = styled.img`
  min-width: 10%;
  max-width: 10%;
`;
export const InputVoiceText = styled.span`
  max-width: 80%;
  font-size: 16px;
  font-weight: bold;
  white-space: pre-wrap;
`;

export const XImg = styled.img`
  position: absolute;
  width: 20px;
  top: 12px;
  right: 12px;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  gap: 8px;
  padding: 6px 14px;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
`;

export const XImage = styled.img`
  width: 32px;
  height: 32px;
`;

export const InputText = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #b4b4b4;
  border-radius: 10px;
  outline: none;
  padding-left: 6px;
  font-size: 16px;
  font-weight: 600;
  &::placeholder {
    color: #787878;
  }
`;

export const SendButton = styled.img`
  width: 32px;
  height: 32px;
`;

const Chatbot = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [userText, setUserText] = useState('');
  const [originHeight, setOriginHeight] = useState(
    window.visualViewport.height,
  );
  const wrapperRef = useRef(null);
  const [keyboardOpened, setKeyboardOpened] = useState(false);
  const containerRef = useRef();
  const inputRef = useRef();
  const downRef = useRef();
  const chatPage = useRef(1);

  const [chattingList, setChattingList] = useState({
    chatProfileImageUrl: '',
    qnaResponses: [],
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

  const [showSubCategory, setShowSubCategory] = useState(false);

  const accessToken = cookies.accessToken;
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [loadFirst, setLoadFirst] = useState(false);

  const setGender = useStore((state) => state.setGender);

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
    if (!browserSupportsSpeechRecognition) {
      alert('Speech recognition not supported');
    }
    getUserInfo(accessToken, setUserInfo, setUserName, setGender);
  }, []);

  // 타이머를 리셋하고 새로 설정하는 함수
  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!isTimerFirst) {
          console.log('입력이 3초 동안 없어 음성 인식 중지');
          SpeechRecognition.stopListening();
          if (!isWaiting) {
            addChat(transcript);
          }
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

  const [firstChat, setFirstChat] = useState({
    answer: `안녕하세요. [${userName}]님! 올봄 챗봇입니다. 무엇을 도와드릴까요?`,
  });

  useEffect(() => {
    setFirstChat({
      answer: `안녕하세요. [${userName}]님! 올봄 챗봇입니다. 무엇을 도와드릴까요?`,
    });
  }, [userName]);

  // 처음 렌더링 시 채팅창 가장 아래로 스크롤
  useEffect(() => {
    const chatWrapper = document.getElementById('chat-wrapper');
    if (chatWrapper) {
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
    }
  }, []);

  const setChatList = async () => {
    await chatbotApis
      .getChatList(accessToken, chatPage.current - 1)
      .then((res) => {
        const reverseList = reverseQnaResponses(res.data);
        setChattingList(reverseList);
      })
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.message ==
          '챗봇 프로필 업데이트가 먼저 필요합니다.'
        ) {
          setIsOpenFirst(true);
        }
      });
    await setLoadFirst(true);
  };
  const postChat = async (data) => {
    try {
      const response = await chatbotApis.postChat(data, accessToken);
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setChatList();
  }, []);

  useEffect(() => {
    if (loadFirst) {
      scrollDown();
    }
  }, [loadFirst]);

  const [categoryList, setCategoryList] = useState([
    { id: 1, title: '날씨', selected: false, values: [] },
    {
      id: 2,
      title: '뉴스',
      selected: false,
      values: [
        { id: 1, title: '전체', selected: false, values: [] },
        { id: 2, title: '정치', selected: false, values: [] },
        { id: 3, title: '경제', selected: false, values: [] },
        { id: 4, title: '세계', selected: false, values: [] },
        { id: 5, title: '스포츠', selected: false, values: [] },
        { id: 6, title: 'IT/과학', selected: false, values: [] },
      ],
    },
    {
      id: 3,
      title: '문화',
      selected: false,
      values: [
        { id: 1, title: '교육', selected: false, values: [] },
        { id: 2, title: '공원', selected: false, values: [] },
        { id: 3, title: '쇼핑', selected: false, values: [] },
      ],
    },
    {
      id: 4,
      title: '방문서비스',
      selected: false,
      values: [
        {
          id: 1,
          title: '간호',
          selected: false,
          values: [],
        },
        {
          id: 2,
          title: '목욕',
          selected: false,
          values: [],
        },
        {
          id: 3,
          title: '요양',
          selected: false,
          values: [],
        },
      ],
    },
  ]);

  const [selectMode, setSelectMode] = useState('select');
  const inputVoiceInfo =
    '질문을 말씀해주세요 ! \n5초 동안 말씀이 없으시면 종료됩니다.';
  const categoryClick = (id) => {
    const newCategoryList = categoryList.map((category) => {
      if (category.id === id) {
        if (category.selected === true) {
          category.selected = false;
          setShowSubCategory(!showSubCategory);
        } else {
          // 날씨 선택 시 구현 추가
          setSelectedCategoryId(id);
          console.log('선택된 카테고리 타이틀 : ', category.title);
          if (category.title === '날씨') {
            const requestCategory = weatherRequest();
            if (!isWaiting) {
              addChat(requestCategory);
            }
          }
          category.selected = true;
          setShowSubCategory(!showSubCategory);
        }
      } else {
        category.values.map((subCategory) => {
          subCategory.selected = false;
        });
        category.selected = false;
      }
      return category;
    });
    setCategoryList(newCategoryList);
  };

  const subCategoryClick = (id) => {
    const newSubCategoryList = categoryList.map((category) => {
      category.values.map((subCategory) => {
        if (subCategory.id === id && category.id === selectedCategoryId) {
          console.log('선택된 서브카테고리 타이틀 : ', subCategory.title);
          let requestCategory = '';
          if (category.title === '뉴스') {
            if (subCategory.title === '전체') {
              requestCategory = newsRequest('');
            } else {
              requestCategory = newsRequest(subCategory.title);
            }
          } else if (category.title === '방문서비스') {
            requestCategory = serviceRequest(subCategory.title);
          } else if (category.title === '문화') {
            requestCategory = cultureRequest(subCategory.title);
          }
          if (!isWaiting) {
            addChat(requestCategory);
          }

          setSelectedSubCategoryId(id);

          subCategory.selected = true;
        } else {
          subCategory.selected = false;
        }
        return subCategory;
      });
      return category;
    });
    setCategoryList(newSubCategoryList);
    setShowSubCategory(false);
  };

  const scrollAfterSend = () => {
    const chatWrapper = document.getElementById('chat-wrapper');
    if (chatWrapper) {
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
    }
  };
  const scrollDown = () => {
    const chatWrapper = document.getElementById('chat-wrapper');
    if (downRef) {
      chatWrapper.scrollTo(0, downRef.current?.offsetTop);
    }
  };
  const addChat = async (userQuestion) => {
    const question = {
      isGame: 'false',
      question: userQuestion,
    };
    const showingChat = {
      answer: '',
      question: userQuestion,
      type: 'GENERAL',
      isLoading: true, // 로딩 상태 추가
    };

    // 사용자가 입력한 채팅을 먼저 화면에 보여줌
    await setChattingList((prevChattingList) => ({
      ...prevChattingList,
      qnaResponses: [...prevChattingList.qnaResponses, showingChat],
    }));
    setIsWaiting(true);

    setUserText('');
    const inputUserText = document.getElementById('input-text');
    if (inputUserText) {
      inputUserText.value = '';
    }
    await scrollDown();
    try {
      const response = await postChat(question);
      const updatedAnswer = response.data; // 서버에서 받은 응답

      // 응답을 받아 기존 채팅의 답변을 업데이트
      setChattingList((prevChattingList) => ({
        ...prevChattingList,
        qnaResponses: prevChattingList.qnaResponses.map((chat, index) =>
          index === prevChattingList.qnaResponses.length - 1
            ? {
                ...chat,
                answer: updatedAnswer.answer,
                type: updatedAnswer.type,
                isLoading: false,
              }
            : chat,
        ),
      }));
      if (
        updatedAnswer.type === 'GENERAL' ||
        updatedAnswer.type === 'WEATHER'
      ) {
        googleTTS(updatedAnswer.answer);
      } else if (updatedAnswer.type === 'NEWS') {
        const newsData = parseNewsData(updatedAnswer.answer);
        let completeSentence = '';
        const newsHeader = newsData.header;
        completeSentence += newsHeader + '\n';
        const articles = newsData.articles.slice(
          0,
          newsData.articles.length / 2,
        );
        articles.map((article) => {
          completeSentence += article.title + '\n';
        });
        completeSentence += '더 많은 뉴스를 보여드릴까요 ?';
        googleTTS(completeSentence);
      } else if (
        updatedAnswer.type === 'PARK' ||
        updatedAnswer.type === 'SHOPPING' ||
        updatedAnswer.type === 'EDUCATION' ||
        updatedAnswer.type === 'CARE' ||
        updatedAnswer.type === 'BATH'
      ) {
        const spittedValue = updatedAnswer.answer.split('\n');
        let completeSentence = '';
        const otherHeader = spittedValue[0];
        completeSentence += otherHeader + '\n';
        const otherContents = convertArrayToObjectList(spittedValue.slice(1));
        otherContents.map((content) => {
          completeSentence += content.location + '\n';
          completeSentence += '주소 ' + content.address + '\n';
          if (
            updatedAnswer.type !== 'SHOPPING' &&
            updatedAnswer.type !== 'PARK'
          ) {
            completeSentence += '전화번호 ' + content.phone + '\n';
          }
        });
        googleTTS(completeSentence);
      }
      setIsWaiting(false);
      // scrollAfterSend();
      scrollDown();
    } catch (error) {
      console.log('error : ', error);
      // 서버 오류 메시지를 사용자에게 표시
      setChattingList((prevChattingList) => ({
        ...prevChattingList,
        qnaResponses: prevChattingList.qnaResponses.map((chat, index) =>
          index === prevChattingList.qnaResponses.length - 1
            ? {
                ...chat,
                answer:
                  error.response?.data?.message ||
                  '답변을 가져오는 중 오류가 발생했습니다.',
                isLoading: false,
              }
            : chat,
        ),
      }));
      console.log('답변 error : ', error);
      // scrollAfterSend();
      scrollDown();
      setIsWaiting(false);
    }

    scrollDown();

    // await scrollAfterSend();
  };

  /* 모바일 가상 키보드 start */
  const handleScroll = (e) => {
    // 키보드가 올라온 경우 스크롤 이벤트를 방지
    if (window.visualViewport.height < originHeight) {
      let target = e.target;
      // 이벤트가 ChattingWrapper 내부에서 발생했는지 확인
      while (target != null) {
        if (target === wrapperRef.current) {
          // 스크롤 위치와 ChattingWrapper의 높이를 계산하여, 스크롤이 끝에 도달했는지 확인
          const { scrollTop, clientHeight, scrollHeight } = wrapperRef.current;

          // 스크롤이 최하단에 도달했다면, 추가 스크롤 방지 및 알림
          if (scrollTop + clientHeight >= scrollHeight) {
            e.preventDefault();
            return;
          }
          // ChattingWrapper 내부에서 스크롤이 최하단에 도달하지 않았다면, 스크롤 이벤트를 허용
          return;
        }
        target = target.parentNode;
      }
      // ChatbotContainer에서 발생한 스크롤 이벤트이므로 막음
      e.preventDefault();
    }
  };

  const setupEventListeners = () => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, {
      passive: false,
    });
  };

  const removeEventListeners = () => {
    window.removeEventListener('wheel', handleScroll);
    window.removeEventListener('touchmove', handleScroll);
  };

  const handleGlobalScrollPrevent = (e) => {
    e.preventDefault();
  };

  // 현재 스크롤 위치가 innerHeight 보다 크면, 스크롤을 막음
  const handleChattingWrapperScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    // 스크롤이 ChattingWrapper의 높이만큼 도달했는지 확인
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      // 스크롤이 끝에 도달했다면, alert을 표시.
      window.addEventListener('wheel', handleGlobalScrollPrevent, {
        passive: false,
      });
      window.addEventListener('touchmove', handleGlobalScrollPrevent, {
        passive: false,
      });
      e.currentTarget.scrollTop = scrollTop - 3;
    } else {
      // 스크롤이 끝에 도달하지 않았다면 전역 스크롤 이벤트를 다시 활성화
      window.removeEventListener('wheel', handleGlobalScrollPrevent);
      window.removeEventListener('touchmove', handleGlobalScrollPrevent);
    }
  };

  const handleViewportResize = () => {
    // IOS 에서 키보드가 올라올 때 발생하는 이벤트 - IOS 에서 수동으로 실행 시켜줘야해서 필요함.
    const chattingWrapper = wrapperRef.current;
    const chatInput = inputRef.current;
    handleKeyboardVisibility();
    if (chattingWrapper) {
      if (chatInput) {
        const inputHeight = chatInput.offsetHeight;
        chattingWrapper.style.height = `${
          window.visualViewport.height - inputHeight
        }px`;
        // chatInput.style.top = `${window.visualViewport.height - inputHeight}px`;
        // chatInput.style.bottom = '';
      } else {
        chattingWrapper.style.height = `${window.visualViewport.height}px`;
        // chatInput.style.top = '';
        // chatInput.style.bottom = '78px';
      }
    } else {
      if (chattingWrapper) {
        chattingWrapper.style.height = `${window.visualViewport.height}px`;
      }
    }
  };
  const preventTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleKeyboardVisibility = () => {
    const chattingWrapper = wrapperRef.current;
    const currentHeight = window.visualViewport.height;
    // 키보드가 열렸다고 판단되면 스크롤을 막음
    if (currentHeight < originHeight) {
      setKeyboardOpened(true);
      window.scroll(0, 0);
      chattingWrapper.scrollTop = chattingWrapper.scrollHeight;
      setupEventListeners(); // 스크롤 방지 이벤트 리스너 설정
    } else {
      setKeyboardOpened(false);
      removeEventListeners(); // 스크롤 방지 이벤트 리스너 제거
    }
  };

  useEffect(() => {
    const chattingWrapper = wrapperRef.current;
    const chatInput = inputRef.current;
    if (chatInput) {
      chatInput.addEventListener('touchmove', preventTouchMove, {
        passive: false,
      });
    }
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    // 뷰포트 크기가 변경될 때 실행될 핸들러 함수
    window.visualViewport.addEventListener('resize', handleViewportResize);

    window.addEventListener('resize', handleKeyboardVisibility);

    chattingWrapper.addEventListener('scroll', handleChattingWrapperScroll);

    // 초기 레이아웃 설정
    handleViewportResize();
    setupEventListeners();

    return () => {
      removeEventListeners();
      window.removeEventListener('resize', handleKeyboardVisibility);
      window.removeEventListener('touchstart', handleTouchStart);

      window.visualViewport.removeEventListener('resize', handleViewportResize);
      chattingWrapper.removeEventListener(
        'scroll',
        handleChattingWrapperScroll,
      );
      if (chatInput) {
        chatInput.removeEventListener('touchmove', preventTouchMove);
      }
    };
  }, []);

  const getNextList = async () => {
    try {
      const res = await chatbotApis.getChatList(
        accessToken,
        chatPage.current - 1,
      );
      const reverseList = reverseQnaResponses(res.data);

      setChattingList((prev) => ({
        ...prev,
        qnaResponses: [...reverseList.qnaResponses, ...prev.qnaResponses],
      }));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const chatWrapper = document.getElementById('chat-wrapper');
    const gun = () => {
      if (chatWrapper) {
        if (chatWrapper.scrollTop === 20) {
          chatPage.current += 1;
          getNextList();
        }
      }
    };
    if (chatWrapper) {
      chatWrapper.addEventListener('scroll', gun);
    } else {
    }
    return () => {
      chatWrapper.removeEventListener('scroll', gun);
    };
  }, []);

  /* 모바일 가상 키보드 end */

  return (
    <Layout>
      <ChatbotContainer ref={containerRef}>
        <ChatbotHeader
          onClick={() => {
            navigate('/my-page');
          }}
        />
        <ChatbotModalFirst
          isOpen={isOpenFirst}
          close={() => {
            setIsOpenSecond(true);
            setIsOpenFirst(false);
          }}
        />
        <ChatbotModalSecond
          isOpen={isOpenSecond}
          setIsOpenSecond={setIsOpenSecond}
          handlePrev={() => {
            setIsOpenFirst(true);
            setIsOpenSecond(false);
          }}
          handleNext={() => setIsOpenSecond(false)}
        />
        <ChattingWrapper ref={wrapperRef} id="chat-wrapper">
          {chattingList.qnaResponses.length !== 0 ? (
            <>
              {chattingList.qnaResponses.map((chat) => (
                <ChatPair
                  qnaPairs={chat}
                  chatImg={chattingList.chatProfileImageUrl}
                />
              ))}
              <DownPoint ref={downRef} />
            </>
          ) : (
            <ChatSystem content={firstChat.answer} type={'GENERAL'} />
          )}

          <BottomWrapper ref={inputRef}>
            {selectMode === 'voice' && (
              <InputVoiceWrapper>
                <MicImg
                  src={process.env.PUBLIC_URL + 'images/Chatbot/mic-icon.svg'}
                />
                <InputVoiceText>{transcript || inputVoiceInfo}</InputVoiceText>
                <XImg
                  src={process.env.PUBLIC_URL + 'images/x-img.svg'}
                  onClick={() => voiceXClick()}
                />
              </InputVoiceWrapper>
            )}
            {selectMode !== 'voice' && (
              <CategoryWrapper>
                {categoryList.map((category) => (
                  <Category
                    parentCategoryId={category.id}
                    key={category.id}
                    text={category.title}
                    selected={category.selected}
                    color={'var(--primary-color)'}
                    values={category.values}
                    categoryClick={() => categoryClick(category.id)}
                    subCategoryClick={subCategoryClick}
                    showSubCategory={showSubCategory}
                    setShowSubCategory={setShowSubCategory}
                    unselectedColor={'var(--primary-color)'}
                  />
                ))}
              </CategoryWrapper>
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
                  src={process.env.PUBLIC_URL + 'images/x-img.svg'}
                  onClick={() => setSelectMode('select')}
                />
                <InputText
                  type="text"
                  어
                  id="input-text"
                  onClick={handleViewportResize}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="대화를 입력하세요"
                />
                {userText === '' || isWaiting ? (
                  <SendButton
                    src={
                      process.env.PUBLIC_URL +
                      'images/Chatbot/send-icon-off.svg'
                    }
                  />
                ) : (
                  <SendButton
                    onClick={() => addChat(userText)}
                    src={
                      process.env.PUBLIC_URL + 'images/Chatbot/send-icon-on.svg'
                    }
                  />
                )}
              </ChatInputWrapper>
            )}
          </BottomWrapper>
        </ChattingWrapper>
      </ChatbotContainer>
    </Layout>
  );
};

export default Chatbot;
