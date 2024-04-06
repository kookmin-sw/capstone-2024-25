// Chatbot.js

import styled from 'styled-components';
import ChatbotHeader from '../components/Header/ChatbotHeader';
import ChatbotModalFirst from '../components/Modal/ChatbotFirst';
import ChatbotModalSecond from '../components/Modal/ChatbotSecond';
import Chat from '../components/Chatbot/Chat';
import ChatInput from '../components/Chatbot/ChatInput';
import Category from '../components/Toggle/Category';
import { useState } from 'react';

const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid yellow;
  overflow-x: hidden;
`;

const ChattingWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  padding: 12px 24px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid red;
  position: relative;
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 78px;
  border: 1px solid blue;
  box-sizing: border-box;
`;

const Chatbot = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [userText, setUserText] = useState('');
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
    console.log('gmlgmlmglm');
    const newCategoryList = categoryList.map((category) =>
      category.id === id
        ? { ...category, selected: !category.selected }
        : category,
    );
    console.log(newCategoryList);
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
    // {
    //   id: 4,
    //   text: 'nope',
    //   type: 'User',
    // },
    // {
    //   id: 5,
    //   text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
    //   type: 'System',
    // },
    // {
    //   id: 6,
    //   text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
    //   type: 'User',
    // },
    // {
    //   id: 7,
    //   text: 'nopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenopenope',
    //   type: 'System',
    // },
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

  return (
    <ChatbotContainer>
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
      <ChattingWrapper>
        {chatListDummy.map((chat) => (
          <Chat text={chat.text} type={chat.type} key={chat.id} />
        ))}
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
      </ChattingWrapper>
      <ChatInput userText={userText} setUserText={setUserText} />
      {/*<Footer>하단바 영역</Footer>*/}
    </ChatbotContainer>
  );
};

export default Chatbot;
