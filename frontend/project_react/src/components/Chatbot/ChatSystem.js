import styled from 'styled-components';
import BubbleType1 from './BubbleType1';
import BubbleType2 from './BubbleType2';
import BubbleType3 from './BubbleType3';
import Profile from './Profile';
import { useEffect, useState } from 'react';

const ChatContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const NewsChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ChatSystem = ({ content, type }) => {
  const [tempList, setTempList] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (content.type === 'NEWS' && content.answer.articles) {
      const newTempList = content.answer.articles.slice(0, 3);
      setTempList(newTempList);
    }
  }, [content]);

  const clickYes = () => {
    setTempList(content.answer.articles);
    setShowNext(true);
  };

  const clickNo = () => {
    setShowNext(true);
  };

  let BubbleComponent;

  switch (type) {
    case 'GENERAL':
    case 'WEATHER':
      BubbleComponent = <BubbleType1 content={content.answer} />;
      break;
    case 'NEWS':
      BubbleComponent = (
        <NewsChatContainer>
          <BubbleType2
            content={content.answer}
            showList={tempList}
            clickYes={clickYes}
            clickNo={clickNo}
            showNext={showNext}
          />
        </NewsChatContainer>
      );
      break;
    default:
      BubbleComponent = <BubbleType3 content={content.answer} />;
  }

  return (
    <ChatContainer>
      <Profile type={'System'} />
      {BubbleComponent}
    </ChatContainer>
  );
};

export default ChatSystem;
