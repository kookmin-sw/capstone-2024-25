// Bubble.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const BubbleContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  background-color: var(--primary-color);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  flex-direction: column;
  gap: 16px;
  font-weight: 500;
`;
const BubbleValue = styled.span`
  font-size: 16px;
  color: #ffffff;
  max-width: 230px;
  white-space: normal;
  word-break: break-all;
`;
const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  margin: 8px 0;
`;

const PhoneNum = styled.a`
  color: #0066ff;
`;

const SpinnerImg = styled.img`
  width: 120px;
  height: 120px;
`;

const BubbleType3 = ({ content }) => {
  const [header, setHeader] = useState('');
  const [showContents, setShowContents] = useState([]);

  const keyList = { 시설명: 'location', 전화번호: 'phone', 주소: 'address' };

  const convertArrayToObjectList = (data) => {
    const result = [];
    let currentObject = {};

    data.forEach((line, index) => {
      const parts = line.split(': ');
      const keyName = parts[0].trim();
      const value = parts.slice(1).join(': ').trim();

      if (keyName.match(/^\d+\./)) {
        if (index !== 0) {
          result.push(currentObject);
          currentObject = {};
        }
        currentObject[keyList[keyName.replace(/^\d+\.\s*/, '')]] = value;
      } else {
        currentObject[keyList[keyName]] = value;
      }
    });

    result.push(currentObject);
    return result;
  };

  useEffect(() => {
    if (content && content.length !== 0) {
      setHeader(content.header);
      const newContents = content.split('\n');
      setHeader(newContents[0]);
      setShowContents(convertArrayToObjectList(newContents.slice(1)));
    }
  }, [content]);

  return (
    <BubbleContainer>
      {showContents.length !== 0 ? (
        <>
          <BubbleValue>{header}</BubbleValue>
          <BubbleWrapper>
            {showContents.map((item, index) => (
              <>
                <BubbleValue>{item.location}</BubbleValue>
                <BubbleValue>주소 : {item.address}</BubbleValue>
                <BubbleValue>
                  전화번호 :{' '}
                  {item.phone === '정보 없음' ? (
                    item.phone
                  ) : (
                    <PhoneNum href={`tel:${item.phone}`}>{item.phone}</PhoneNum>
                  )}
                </BubbleValue>
                {showContents.length - 1 !== index && <Divider />}
              </>
            ))}
          </BubbleWrapper>
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

export default BubbleType3;
