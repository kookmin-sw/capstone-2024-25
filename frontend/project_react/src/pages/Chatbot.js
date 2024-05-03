// Chatbot.js

import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import ChatbotModalSecond from '../components/Modal/ChatbotSecond';
import Chat from '../components/Chatbot/Chat';
import Category from '../components/Toggle/Category';
import SelectInputMode from '../components/Chatbot/SelectInputMode';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { testFun } from './ComponentTest';

import { useEffect, useRef, useState } from 'react';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

const ChattingWrapper = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  padding: 12px 24px 100px 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: #ffffff;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const InputVoiceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  width: 88%;
  height: 84px;
  box-sizing: border-box;
  border: 1px solid var(--unselected-color);
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const MicImg = styled.img`
  width: 42px;
`;
const InputVoiceText = styled.span`
  font-size: 16px;
  font-weight: bold;
  white-space: pre-wrap;
`;

const XImg = styled.img`
  position: absolute;
  width: 20px;
  top: 12px;
  right: 12px;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  gap: 8px;
  padding: 6px 14px;
  //height: 64px;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
`;

const XImage = styled.img`
  width: 32px;
  height: 32px;
`;

const InputText = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #b4b4b4;
  border-radius: 10px;
  outline: none;
  padding-left: 6px;
  font-size: 16px;
  &::placeholder {
    color: #787878;
  }
`;

const SendButton = styled.img`
  width: 32px;
  height: 32px;
`;

const Chatbot = () => {
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
  const footerRef = useRef();

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

  const [showSubCategory, setShowSubCategory] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  // const [timer, setTimer] = useState(null);
  // const [startTimer, setStartTimer] = useState(null);
  const clickVoice = () => {
    SpeechRecognition.startListening({ continuous: true });
    console.log('gugu 실행');
  };
  const voiceXClick = () => {
    resetTranscript();
    SpeechRecognition.stopListening();
    setSelectMode('select');
  };
  const [voiceInputStartTime, setVoiceInputStartTime] = useState(null);

  useEffect(() => {
    if (listening) {
      setVoiceInputStartTime(Date.now());
    }

    const checkEndTimer = () => {
      if (voiceInputStartTime && Date.now() - voiceInputStartTime >= 2000) {
        setVoiceInputStartTime(null);
        resetTranscript();
        SpeechRecognition.stopListening();
      }
    };

    const timerId = setTimeout(checkEndTimer, 2000);

    return () => clearTimeout(timerId);
  }, [listening, transcript, voiceInputStartTime]);
  // useEffect(() => {
  //   console.log(
  //     'Speech Recognition Support:',
  //     browserSupportsSpeechRecognition,
  //   );
  //   if (!browserSupportsSpeechRecognition) {
  //     alert('This browser does not support speech recognition.');
  //   }
  // }, []);

  const [categoryList, setCategoryList] = useState([
    { id: 1, title: '날씨', selected: false, values: [] },
    {
      id: 2,
      title: '뉴스',
      selected: false,
      values: [
        { id: 1, title: '정치', selected: false, values: [] },
        { id: 2, title: '경제', selected: false, values: [] },
        { id: 3, title: '사회', selected: false, values: [] },
        { id: 4, title: '세계', selected: false, values: [] },
        { id: 5, title: '생활/문화', selected: false, values: [] },
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
        { id: 1, title: '간호', selected: false, values: [] },
        { id: 2, title: '목욕', selected: false, values: [] },
        { id: 3, title: '요양', selected: false, values: [] },
      ],
    },
  ]);

  const [selectMode, setSelectMode] = useState('select');
  const inputVoiceInfo =
    '질문을 말씀해주세요 ! \n5초 동안 말씀이 없으시면 종료됩니다.';
  const categoryClick = (id) => {
    const newCategoryList = categoryList.map((category) => {
      if (category.id === id) {
        setSelectedCategoryId(id);
        category.selected = true;
        setShowSubCategory(!showSubCategory);
        // 추후 SubCategory가 없을 경우와 있을 경우를 구별해서 요청을 보내도록.
        // if(category.values.length === 0) {
        // setShowSubCategory(false);
        // }
      } else {
        category.values.map((subCategory) => {
          // setShowSubCategory(true);
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

  const [chatListDummy, setChatListDummy] = useState([
    {
      id: 1,
      text: '안녕하세요 [희건]님 ! \n' + '무엇을 도와드릴까요 ?',
      type: 'System',
    },
    {
      id: 2,
      text: '오늘 날씨 알려줘',
      type: 'User',
    },
    {
      id: 3,
      text:
        '금일 날씨는 구름이 낀 흐린 \n' +
        '날씨이며, \n' +
        '금일 기온은 최고 영상 11도, \n' +
        '최저 영하 2도로 강수 확률은 \n' +
        '20%입니다.\n' +
        '미세 먼지 농도는 보통이며,\n' +
        '또 뭐 알려줘 ?',
      type: 'System',
    },
    {
      id: 4,
      text: '오늘따라 무기력해.',
      type: 'User',
    },
    {
      id: 5,
      text:
        '우울할 땐 바깥 산책이라도 \n' +
        '다녀오는건 어떠신가요?\n' +
        '근처 정릉 실버극장에서 영화도 \n' +
        '무료 관람 가능합니다.\n' +
        '자세한 정보 제공을 원하시나요?',
      type: 'System',
    },
    {
      id: 6,
      text: '오늘 뉴스 알려줘',
      type: 'User',
    },
    {
      id: 7,
      text:
        '오늘 2024년 3월 4일 주요 뉴스입니다.\n' +
        '\n' +
        '정치:\n' +
        '민생토론회: 윤석렬 대통령은 대구에서 민생토론회를 개최했습니다. 주요 내용은 부동산, 일자리, 탈원전 정책 등이었습니다.\n' +
        '\n' +
        '사회:\n' +
        '농축산업에 AI 적용: 정부는 농축산업에 AI 기술을 적용하여 스마트 온실과 축사를 확대할 계획입니다.\n' +
        '\n' +
        '경제:\n' +
        '황재복 SPC 대표 구속기로 석방: 황재복 SPC 대표는 구속기로 석방되었습니다.',
      type: 'System',
    },
    // {
    //   id: 9,
    //   text: 'nope',
    //   type: 'System',
    // },
    // {
    //   id: 10,
    //   text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
    //   type: 'User',
    // },
  ]);

  const addChat = (text, type) => {
    // 유저 텍스트 추가
    // console.log('gmlgml');
    // const newChat = {
    //   id: chatListDummy.length + 1,
    //   text: userText,
    //   type: 'User',
    // };
    // setChatListDummy([...chatListDummy, newChat]);
    testFun(chatListDummy[chatListDummy.length - 1].text);
  };

  const addSystemChat = () => {
    const newChat = {
      id: chatListDummy.length + 1,
      text: chatListDummy[chatListDummy.length - 1].text,
      type: 'User',
    };
    setChatListDummy([...chatListDummy, newChat]);
    // testFun(userText);
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
    // const footer = footerRef.current;
    const chatInput = inputRef.current;
    const currentHeight = window.visualViewport.height;
    // 키보드가 열렸다고 판단되면 스크롤을 막음
    if (currentHeight < originHeight) {
      setKeyboardOpened(true);
      window.scroll(0, 0);

      // footer.style.display = 'none';
      // chatInput.style.height = '80px';
      chattingWrapper.scrollTop = chattingWrapper.scrollHeight;
      setupEventListeners(); // 스크롤 방지 이벤트 리스너 설정
    } else {
      setKeyboardOpened(false);
      // footer.style.display = 'block';
      // chatInput.style.height = '158px';
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

  /* 모바일 가상 키보드 end */

  return (
    <ChatbotContainer ref={containerRef}>
      <ChatbotHeader
        onClick={() => {
          console.log('categoryList : ', categoryList);
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
        handlePrev={() => {
          setIsOpenFirst(true);
          setIsOpenSecond(false);
        }}
        handleNext={() => setIsOpenSecond(false)}
      />
      {/*<button onClick={() => setIsOpenFirst(true)}>gmlgml</button>*/}
      <ChattingWrapper ref={wrapperRef}>
        {chatListDummy.map((chat) => (
          <Chat text={chat.text} type={chat.type} key={chat.id} />
        ))}
        <BottomWrapper ref={inputRef}>
          {selectMode === 'voice' && (
            <InputVoiceWrapper>
              <MicImg
                src={process.env.PUBLIC_URL + 'images/Chatbot/mic-icon.svg'}
              />
              <InputVoiceText>{transcript || inputVoiceInfo}</InputVoiceText>
              <XImg
                src={process.env.PUBLIC_URL + 'images/x-img.svg'}
                onClick={() => setSelectMode('select')}
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
                onClick={() => voiceXClick()}
              />
              <InputText
                type="text"
                onClick={handleViewportResize}
                onChange={(e) => setUserText(e.target.value)}
              />
              {userText === '' ? (
                <SendButton
                  src={
                    process.env.PUBLIC_URL + 'images/Chatbot/send-icon-off.svg'
                  }
                />
              ) : (
                <SendButton
                  onClick={() => addChat()}
                  src={
                    process.env.PUBLIC_URL + 'images/Chatbot/send-icon-on.svg'
                  }
                />
              )}
            </ChatInputWrapper>
          )}
          {/*<Footer ref={footerRef}>하단바 영역</Footer>*/}
        </BottomWrapper>
      </ChattingWrapper>

      {/*<Footer>하단바 영역</Footer>*/}
    </ChatbotContainer>
  );
};

export default Chatbot;
