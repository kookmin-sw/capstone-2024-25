// Bubble.js

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { convertArrayToObjectList } from '../../utils/handleChat';
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

const BubbleType3 = ({ content, bubbleType }) => {
  const [header, setHeader] = useState('');
  const [showContents, setShowContents] = useState([]);

  useEffect(() => {
    if (bubbleType === 'SHOPPING' || bubbleType === 'PARK') {
      console.log('bubbleType : ', bubbleType);
    }
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
                {bubbleType !== 'SHOPPING' && bubbleType !== 'PARK' && (
                  <BubbleValue>
                    전화번호 :{' '}
                    {item.phone === '정보 없음' ? (
                      item.phone
                    ) : (
                      <PhoneNum href={`tel:${item.phone}`}>
                        {item.phone}
                      </PhoneNum>
                    )}
                  </BubbleValue>
                )}
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
