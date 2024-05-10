// BubbleType2.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import BubbleMoreNews from './BubbleMoreNews';

const BubbleContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  background-color: var(--primary-color);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  flex-direction: column;
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

const BubbleType2 = ({ content, gun }) => {
  const [header, setHeader] = useState('');
  const [contents, setContents] = useState([]);
  useEffect(() => {
    if (content) {
      console.log('BubbleType2 content : ', content);
      console.log('BubbleType2 gun : ', gun);
      setHeader(content.header + '\n' + '\n');
      // setContents(content);
      setContents(gun);
      // setContents(gun);
    }
  }, []);
  useEffect(() => {
    console.log('gun : ', gun);
  }, [gun]);

  // useEffect(() => {
  //   console.log('articles : ', contents);
  // }, [content.articles]);

  return (
    <BubbleContainer>
      <BubbleValue>{header}</BubbleValue>
      {contents.map((news, index) => (
        <>
          <NewsItem key={index} news={news} />
          {contents.length - 1 !== index && <Divider />}
        </>
      ))}
    </BubbleContainer>
  );
};

export default BubbleType2;
