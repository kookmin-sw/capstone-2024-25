// Chatbot.js

import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import ChatbotModalSecond from '../components/Modal/ChatbotSecond';
import Chat from '../components/Chatbot/Chat';
import Category from '../components/Toggle/Category';
import { useEffect, useRef, useState } from 'react';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
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
  position: relative;
  height: 100%;
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const TempInput = styled.div`
  width: 100%;
  height: 158px;
  position: fixed;
  bottom: 0;
  left: 0;
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

const Footer = styled.div`
  width: 100%;
  height: 78px;
  background-color: bisque;
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

  const categoryList = [
    { id: 1, title: '날씨', selected: false, values: [] },
    { id: 2, title: '뉴스', selected: false, values: [] },
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
  ];
  const categoryClick = (id) => {
    const newCategoryList = categoryList.map((category) =>
      category.id === id
        ? { ...category, selected: !category.selected }
        : category,
    );
  };

  const chatListDummy = [
    {
      id: 1,
      text: 'nope',
      type: 'System',
    },
    {
      id: 2,
      text: 'nope',
      type: 'User',
    },
    {
      id: 3,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    {
      id: 4,
      text: 'nope',
      type: 'User',
    },
    {
      id: 5,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    {
      id: 6,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'User',
    },
    {
      id: 7,
      text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
      type: 'System',
    },
    // {
    //   id: 8,
    //   text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
    //   type: 'User',
    // },
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
  ];

  const handleScroll = (e) => {
    // 키보드가 올라온 경우 스크롤 이벤트를 방지
    if (window.visualViewport.height < originHeight) {
      let target = e.target;

      // 이벤트가 ChattingWrapper 내부에서 발생했는지 확인
      while (target != null) {
        if (target === wrapperRef.current) {
          // 스크롤 위치와 ChattingWrapper의 높이를 계산하여, 스크롤이 끝에 도달했는지 확인
          const { scrollTop, clientHeight, scrollHeight } = wrapperRef.current;

          // 스크롤이 최하단에 도달했다면, 추가 스크롤 방지
          if (scrollTop + clientHeight >= scrollHeight) {
            e.preventDefault();
            return;
          }
          return;
        }
        target = target.parentNode;
      }
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
      // 스크롤이 끝에 도달했다면, alert을 표시합니다.
      window.addEventListener('wheel', handleGlobalScrollPrevent, {
        passive: false,
      });
      window.addEventListener('touchmove', handleGlobalScrollPrevent, {
        passive: false,
      });
      e.currentTarget.scrollTop = scrollTop - 2;
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
        chatInput.style.top = `${window.visualViewport.height - inputHeight}px`;
        // chatInput.style.bottom = '';
      } else {
        chattingWrapper.style.height = `${window.visualViewport.height}px`;
        chatInput.style.top = '';
        // chatInput.style.bottom = '78px';
        alert('chatInput 없음');
      }
    } else {
      alert('chattingWrapper 없음');
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
    const chatInput = inputRef.current;
    const footer = footerRef.current;
    const currentHeight = window.visualViewport.height;
    // 키보드가 열렸다고 판단되면 스크롤을 막음
    if (currentHeight < originHeight) {
      setKeyboardOpened(true);
      footer.style.display = 'none';
      chatInput.style.height = '80px';
      setupEventListeners(); // 스크롤 방지 이벤트 리스너 설정
    } else {
      setKeyboardOpened(false);
      footer.style.display = 'block';
      chatInput.style.height = '158px';

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
    const footer = footerRef.current;

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

  return (
    <ChatbotContainer id="gun" ref={containerRef}>
      <ChatbotHeader />
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
        <TempInput ref={inputRef}>
          <CategoryWrapper>
            {categoryList.map((category) => (
              <Category
                key={category.id}
                text={category.title}
                selected={category.selected}
                color={'#FFD700'}
                values={category.values}
                onClick={() => categoryClick(category.id)}
              />
            ))}
          </CategoryWrapper>
          <ChatInputWrapper>
            <XImage
              src={process.env.PUBLIC_URL + 'images/x-img.svg'}
              // onClick={() => resetText()}
            />
            <InputText type="text" onClick={handleViewportResize} />
            <SendButton
              src={process.env.PUBLIC_URL + 'images/Chatbot/send-icon-off.svg'}
            />
          </ChatInputWrapper>
          <Footer ref={footerRef}>하단바 영역</Footer>
        </TempInput>
      </ChattingWrapper>

      {/*<Footer>하단바 영역</Footer>*/}
    </ChatbotContainer>
  );
};

export default Chatbot;
