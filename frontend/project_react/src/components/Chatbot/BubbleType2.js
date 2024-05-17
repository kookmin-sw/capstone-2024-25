// BubbleType2.js
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import BubbleMoreNews from './BubbleMoreNews';
import { parseNewsData } from '../../utils/handleChat';

const BubbleContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  background-color: var(--primary-color);
  border: 1px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  flex-direction: column;
  font-weight: 500;
`;
const BubbleValue = styled.span`
  font-size: 16px;
  color: #ffffff;
  max-width: 230px;
  white-space: normal;
  word-break: break-all;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ffffff;
  margin: 8px 0;
`;
const SpinnerImg = styled.img`
  width: 120px;
  height: 120px;
`;
const BubbleType2 = ({ content, showList, clickYes, showNext, clickNo }) => {
  const [header, setHeader] = useState('');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    if (content && content.length !== 0) {
      const parsedData = parseNewsData(content);
      // console.log('parseNewsData : ', parseNewsData(content));
      setHeader(parsedData.header);
      // console.log('showList : ', showList);
      setContents(showList);
    }
  }, [content, showList]);

  return (
    <BubbleContainer>
      {contents.length !== 0 ? (
        <>
          <BubbleValue>{header}</BubbleValue>
          {contents.map((news, index) => (
            <>
              <NewsItem key={index} news={news} />
              {contents.length - 1 !== index && <Divider />}
            </>
          ))}
          {!showNext && (
            <BubbleMoreNews clickYes={clickYes} clickNo={clickNo} />
          )}
        </>
      ) : (
        <SpinnerImg
          src={process.env.PUBLIC_URL + '/images/Chatbot/spinner.gif'}
          alt="spinner"
        />
      )}
    </BubbleContainer>
  );
};

export default BubbleType2;
