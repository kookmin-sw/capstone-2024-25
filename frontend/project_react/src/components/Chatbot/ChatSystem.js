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

const ChatSystem = ({ content, type, chatImg }) => {
  const [tempList, setTempList] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [bubbleContent, setBubbleContent] = useState(null);
  const [bubbleType, setBubbleType] = useState('');
  const [showBubble, setShowBubble] = useState(0);

  useEffect(() => {
    console.log('ChatSystem content : ', content);
    // console.log('ChatSystem content : ', typeof content);
    console.log('ChatSystem type : ', type);
    if (content.type === 'NEWS') {
      const answerToJson = JSON.parse(content);
      console.log('answerToJson : ', answerToJson);
      console.log('answerToJson.articles : ', typeof answerToJson.header);
      if (content.answer.articles) {
        console.log('content.answer.articles : ', content.answer.articles);
        const newTempList = content.answer.articles.slice(0, 3);
        setTempList(newTempList);
      }
    }

    setBubbleContent(content);
    setBubbleType(type);
  }, [content]);

  useEffect(() => {
    console.log('tempList : ', tempList);
  }, [tempList]);

  const clickYes = () => {
    setTempList(content.answer.articles);
    setShowNext(true);
  };

  const clickNo = () => {
    setShowNext(true);
  };

  let BubbleComponent;

  switch (bubbleType) {
    case 'GENERAL':
    case 'WEATHER':
      BubbleComponent = <BubbleType1 content={bubbleContent} />;
      break;
    case 'NEWS':
      BubbleComponent = (
        <NewsChatContainer>
          <BubbleType2
            content={bubbleContent}
            showList={tempList}
            clickYes={clickYes}
            clickNo={clickNo}
            showNext={showNext}
          />
        </NewsChatContainer>
      );
      break;
    default:
      BubbleComponent = <BubbleType3 content={bubbleContent} />;
  }

  return (
    <ChatContainer>
      <Profile type={'System'} chatImg={chatImg} />
      {BubbleComponent}
    </ChatContainer>
  );
};

export default ChatSystem;
