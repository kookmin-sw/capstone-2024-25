import Modal from 'react-modal';
import styled from 'styled-components';
import { useState } from 'react';

const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '280px',
    height: '520px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflowX: 'hidden',
  },
};

const ModalTitle = styled.span`
  align-self: center;
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid red;
`;

const ContentText = styled.p`
  font-size: 16px;
`;

const ChatbotModalFirst = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} style={customModalStyles}>
      <ModalTitle>올봄 챗봇에 오신 것을 환영합니다.</ModalTitle>
      <ModalContent>
        <ContentText>· 무엇이든 물어보세요 !</ContentText>
        <ContentText>· 또는, 추천 키워드들을 통해 질문해주세요 !</ContentText>
        <ContentText>
          · 추천 키워드를 사용하면 현재 위치를 기반으로 날씨, 뉴스, 문화,
          방문서비스 정보를 얻을 수 있습니다!
        </ContentText>
        <ContentText>
          · 또는, 손자, 손녀처럼 편하게 말동무 해드립니다.
        </ContentText>
        <ContentText>· 음성 혹은 자판 둘 다 사용 가능합니다.</ContentText>
        <ContentText>· 챗봇 아바타를 선택해주세요 !</ContentText>
      </ModalContent>
    </Modal>
  );
};

export default ChatbotModalFirst;
