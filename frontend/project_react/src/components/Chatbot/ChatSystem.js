import styled from 'styled-components';
import BubbleType1 from './BubbleType1';
import BubbleType2 from './BubbleType2';
import Bubble from './Bubble';
import Profile from './Profile';
import ProfileSystem from './ProfileSystem';
import { useEffect, useState } from 'react';
import BubbleMoreNews from './BubbleMoreNews';

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const NewsChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //justify-content: center;
  align-items: center;
`;

const ChatSystem = ({ content, type }) => {
  useEffect(() => {
    console.log('ChatSystem content : ', content);
    console.log('ChatSystem type : ', type);
  }, []);
  const [tempList, setTempList] = useState([]);
  const [nextList, setNextList] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (content.type === 'NEWS') {
      if (content.answer.articles) {
        console.log('@@@@@@@@@@걸리나 @@@@@@@@@@@@@');
        console.log('content.answer.articles : ', content.answer.articles);
        // NEWS 타입일 때 content.articles에서 처음 4개 항목을 추출하여 tempList에 저장
        const newTempList = content.answer.articles.slice(0, 3); // 0부터 3까지의 아이템을 추출
        const nextTempList = content.answer.articles.slice(
          3,
          content.answer.articles.length,
        );
        setTempList(newTempList);
        setNextList(nextTempList);
      }
    }
  }, [content]); // content 객체가 변경될 때마다 useEffect 실행

  const clickYes = () => {
    setShowNext(true);
  };

  if (type === 'GENERAL' || type === 'WEATHER') {
    return (
      <ChatContainer>
        <Profile type={type} />
        <BubbleType1 content={content.answer} />
      </ChatContainer>
    );
  } else if (type === 'NEWS') {
    return (
      <ChatContainer>
        <Profile type={type} />
        <NewsChatContainer>
          <BubbleType2 content={content.answer} gun={tempList} />
          <BubbleMoreNews content="glmglm" clickYes={clickYes} />
          {/*{showNext  ?(*/}
          {/*        <BubbleType2 content={content.answer} gun={tempList} />*/}
          {/*    */}
          {/*    )*/}
          {/*    :}*/}
        </NewsChatContainer>
      </ChatContainer>
    );
  }
  // return (
  //   <ChatContainer type={type}>
  //     <Profile type={type} />
  //     <Bubble text={content.answer} type={type} />
  //   </ChatContainer>
  // );
  return null;
};
export default ChatSystem;
