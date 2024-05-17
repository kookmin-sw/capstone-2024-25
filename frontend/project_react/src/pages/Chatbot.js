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

import { testFun } from './ComponentTest';

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
  others,
  serviceRequest,
  weatherRequest,
} from '../utils/handleChat';

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
  gap: 16px; // 나중에 ChatPair 로 옮길 예정
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
  border-top: 2px solid var(--unselected-color);
  padding: 8px 0;
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
  padding: 12px 24px;
  box-sizing: border-box;
  border: 1px solid var(--unselected-color);
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const MicImg = styled.img`
  min-width: 10%;
  max-width: 10%;
`;
const InputVoiceText = styled.span`
  max-width: 80%;
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
  const footerRef = useRef();

  const [gugu, setGugu] = useState({
    chatProfileImageUrl: '',
    qnaResponses: [],
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');

  const [showSubCategory, setShowSubCategory] = useState(false);

  const accessToken = cookies.accessToken;
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState('');
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

  const sliceName = (name) => {
    return name.slice(name.length - 2, name.length);
  };
  const [firstChat, setFirstChat] = useState({
    answer: `안녕하세요. [${userName}]님! 올봄 챗봇입니다. 무엇을 도와드릴까요?`,
  });

  useEffect(() => {
    // console.log('userName 변경 : ', userName);
    setFirstChat({
      answer: `안녕하세요. [${userName}]님! 올봄 챗봇입니다. 무엇을 도와드릴까요?`,
    });
  }, [userName]);

  // 처음 렌더링 시 채팅창 가장 아래로 스크롤
  useEffect(() => {
    const chatWrapper = document.getElementById('chat-wrapper');
    if (chatWrapper) {
      console.log('아래로 이동');
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
    }
  }, []);

  const setChatList = async () => {
    await chatbotApis
      .getChatList(accessToken)
      .then((res) => {
        setGugu(res.data);
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
        {
          id: 1,
          title: '간호',
          selected: false,
          values: [],
          qValue: '방문간호서비스',
        },
        {
          id: 2,
          title: '목욕',
          selected: false,
          values: [],
          qValue: '방문목욕서비스',
        },
        {
          id: 3,
          title: '요양',
          selected: false,
          values: [],
          qValue: '방문요양서비스',
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
        // 날씨 선택 시 구현 추가
        console.log('선택된 카테고리 타이틀 : ', category.title);
        if (category.title === '날씨') {
          const requestCategory = weatherRequest();
          addChat(requestCategory);
        }
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

          addChat(requestCategory);

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
  function convertQuotes(inputString) {
    // 문자열 내의 잘못된 이스케이프 시퀀스를 올바른 형태로 변환
    return inputString.replace(/\\\\"/g, '"');
  }

  // const [gugu, setGugu] = useState({
  //   chatProfileImageUrl: 'string',
  //   qnaPairs: [
  //     {
  //       question: '질문1 - GENERAL | WEATHER',
  //       answer: {
  //         type: 'GENERAL',
  //         answer:
  //           '아, 할아버지께서 심심하시군요. 저와 함께 얘기하면서 시간을 보내보시는 건 어떠신가요? 혹시 요즘 관심 있으신 취미나 특별히 하시고 싶은 일이 있으신가요?',
  //       },
  //     },
  //     {
  //       question: '질문2 - NEWS',
  //       answer: {
  //         type: 'NEWS',
  //         answer: {
  //           header: '오늘 2024년 05월 09일 주요 뉴스를 알려드릴게요!',
  //           articles: [
  //             {
  //               title:
  //                 "[중국 경기 회복 조짐에 철광석 ETN '질주']",
  //               category: 'business',
  //               description:
  //                 '선물 ETN 한달 수익률 44.6% "中정부 각종 부양책에 수요↑" 철광석 최대 소비국으로 알려진...',
  //               link: 'https://www.etoday.co.kr/news/view/2358051',
  //             },
  //             {
  //               title:
  //                 '폭설 · 비도 지진 일으킨다..."기상현상-지진 연관성 첫 규명"',
  //               category: 'world',
  //               description:
  //                 '미국 매사추세츠공대 윌리엄 프랭크 교수팀은 9일 과학 저널 사이언스 어드밴시스에서 지난 수...',
  //               link: 'https://news.sbs.co.kr/news/endPage.do?news_id=N1007640404',
  //             },
  //             {
  //               title: '[1보] 국제유가, 상승...WTI 0.78%↑',
  //               category: 'business',
  //               description:
  //                 '국제유가는 8일(현지시간) 상승했다. 이날 뉴욕상업거래소(NYMEX)에서 6월물 미국 서부 텍ᄉ...',
  //               link: 'https://www.etoday.co.kr/news/view/2358132',
  //             },
  //             {
  //               title:
  //                 "코트라, 산업부와 '브라질 방산·항공 사절단' 파견",
  //               category: 'technology',
  //               description:
  //                 '[서울=뉴시스]이창훈 기자 = 코트라(KOTRA)가 산업통상자원부와 7일부터 사흘간 브라질 리우데ᄌ...',
  //               link: 'https://www.newsis.com/view/NISX20240508_0002727358',
  //             },
  //             {
  //               title:
  //                 "'신태용 매직' 인니, 마지막 한 방 남았다...오늘밤 기니와 파리행 최종전",
  //               category: 'sports',
  //               description:
  //                 '[서울=뉴시스] 김진엽 기자 = 신태용 감독이 이끄는 인도네시아 23세 이하(U-23) 축구대표팀이 ...',
  //               link: 'https://www.newsis.com/view/NISX20240508_0002727976',
  //             },
  //             {
  //               title:
  //                 '경찰, \'한-독 과학치안 협력센터\' 개소..."초국경 범죄 대응·수사기법 공유"',
  //               category: 'politics',
  //               description:
  //                 '[서울=뉴스핌] 박우진 기자 = 한국과 독일 양국 치안기관이 범죄 대응과 수사기법 공유를 ...',
  //               link: 'http://www.newspim.com/news/view/20240508001091',
  //             },
  //           ],
  //         },
  //       },
  //     },
  //     {
  //       question:
  //         '질문3 -  "PARK" | "SHOPPING"| "EDUCATION" | "CARE" | "BATH" | "RECUPERATION"',
  //       answer: {
  //         type:
  //           'PARK' |
  //           'SHOPPING' |
  //           'EDUCATION' |
  //           'CARE' |
  //           'BATH' |
  //           'RECUPERATION',
  //         answer:
  //           '등록하신 주소를 기준으로 문화생활(교육) 장소를 소개해 드릴게요!\n1. 시설명: 남양주시 평생학습센터\n주소: 경기도 남양주시 다산동 3159-7 남양주시청제2청사\n전화번호: 031-590-2582\n2. 시설명: 동부광성평생교육문화원\n주소: 경기도 남양주시 와부읍 덕소리 177-2 동부광성교회\n전화번호: 정보 없음\n3. 시설명: 경복대학교 평생교육대학\n주소: 경기도 남양주시 진접읍 금곡리 383 경복대학교 남양주캠퍼스 학생회관\n전화번호: 031-570-9700',
  //       },
  //     },
  //     {
  //       question: '질문1 - GENERAL | WEATHER',
  //       answer: {
  //         type: 'GENERAL',
  //         answer: '',
  //       },
  //     },
  //     {
  //       question: '질문2 - NEWS',
  //       answer: {
  //         type: 'NEWS',
  //         answer: {},
  //       },
  //     },
  //     {
  //       question:
  //         '질문3 -  "PARK" | "SHOPPING"| "EDUCATION" | "CARE" | "BATH" | "RECUPERATION"',
  //       answer: {
  //         type:
  //           'PARK' |
  //           'SHOPPING' |
  //           'EDUCATION' |
  //           'CARE' |
  //           'BATH' |
  //           'RECUPERATION',
  //         answer: '',
  //       },
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   if (gugu) {
  //     console.log(gugu.qnaPairs[1].question);
  //     console.log(gugu.qnaPairs[1].answer);
  //   }
  // }, [gugu]);

  const categoryValues = ['날씨', '뉴스', 'IT'];

  const scrollAfterSend = () => {
    const chatWrapper = document.getElementById('chat-wrapper');
    if (chatWrapper) {
      console.log('아래로 이동');
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
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
    setGugu((prevGugu) => ({
      ...prevGugu,
      qnaResponses: [...prevGugu.qnaResponses, showingChat],
    }));

    try {
      const response = await postChat(question);
      const updatedAnswer = response.data.answer; // 서버에서 받은 응답

      // 응답을 받아 기존 채팅의 답변을 업데이트
      setGugu((prevGugu) => ({
        ...prevGugu,
        qnaResponses: prevGugu.qnaResponses.map((chat, index) =>
          index === prevGugu.qnaResponses.length - 1
            ? { ...chat, answer: updatedAnswer, isLoading: false }
            : chat,
        ),
      }));
      // scrollAfterSend();
    } catch (error) {
      console.log('error : ', error);
      // 서버 오류 메시지를 사용자에게 표시
      setGugu((prevGugu) => ({
        ...prevGugu,
        qnaResponses: prevGugu.qnaResponses.map((chat, index) =>
          index === prevGugu.qnaResponses.length - 1
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
    }

    setUserText('');
    // const inputUserText = document.getElementById('input-text');
    // inputUserText.value = '';

    await scrollAfterSend();
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

  useEffect(() => {
    if (wrapperRef) {
      // console.log('wrapperRef : ', wrapperRef.current);
      // console.log(
      //   'wrapperRef.current.clientHeight : ',
      //   wrapperRef.current.clientHeight,
      // );
      // console.log(
      //   'wrapperRef.current.scrollHeight : ',
      //   wrapperRef.current.scrollHeight,
      // );
    }
  }, [wrapperRef]);

  useEffect(() => {
    const chatWrapper = document.getElementById('chat-wrapper');
    const gun = () => {
      if (chatWrapper) {
        if (chatWrapper.scrollTop === 0) {
          // 채팅 리스트 페이지네이션에 사용. 중복 요청을 방지하기 위해 변수 하나 선언해서 useState 로 관리 필요해보임.
          // console.log('chatWrapper.scrollTop : ', chatWrapper.scrollTop);
          // console.log('chatWrapper.clientHeight : ', chatWrapper.clientHeight);
        }
      }
    };
    if (chatWrapper) {
      // console.log('chatWrapper : ', chatWrapper);
      chatWrapper.addEventListener('scroll', gun);
    } else {
      // console.log('g,;g,;');
    }
    return () => {
      chatWrapper.removeEventListener('scroll', gun);
    };
  }, []);

  /* 모바일 가상 키보드 end */

  return (
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
        {gugu.qnaResponses.length !== 0 ? (
          <>
            {gugu.qnaResponses.map((chat) => (
              <ChatPair qnaPairs={chat} chatImg={gugu.chatProfileImageUrl} />
            ))}
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
                id="input-text"
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
  );
};

export default Chatbot;
