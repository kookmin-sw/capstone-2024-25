import styled from 'styled-components';
import BubbleType1 from './BubbleType1';
import BubbleType2 from './BubbleType2';
import BubbleType3 from './BubbleType3';
import Profile from './Profile';
import { useEffect, useState } from 'react';

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
  const [tempList, setTempList] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (content.type === 'NEWS') {
      if (content.answer.articles) {
        const newTempList = content.answer.articles.slice(0, 3);
        setTempList(newTempList);
      }
    }
  }, [content]);

  const clickYes = () => {
    setTempList(content.answer.articles);
    setShowNext(true);
  };
  const clickNo = () => {
    setShowNext(true);
  };

  if (type === 'GENERAL' || type === 'WEATHER') {
    return (
      <ChatContainer>
        <Profile type={'System'} />
        <BubbleType1 content={content.answer} />
      </ChatContainer>
    );
  } else if (type === 'NEWS') {
    return (
      <ChatContainer>
        <Profile type={'System'} />
        <NewsChatContainer>
          <BubbleType2
            content={content.answer}
            showList={tempList}
            clickYes={clickYes}
            clickNo={clickNo}
            showNext={showNext}
          />
        </NewsChatContainer>
      </ChatContainer>
    );
  } else {
    return (
      <ChatContainer>
        <Profile type={'System'} />
        <BubbleType3 content={content.answer} />
      </ChatContainer>
    );
  }
};
export default ChatSystem;
