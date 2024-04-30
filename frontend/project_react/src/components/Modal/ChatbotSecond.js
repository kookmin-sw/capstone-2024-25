import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button';
import useStore from '../../stores/store'; // 스토어 임포트

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
    width: '80%',
    height: 'fit-content',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: '40px 8px',
    gap: '20px',
    boxSizing: 'border-box',
  },
};

const ModalTitle = styled.span`
  align-self: center;
  font-size: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  > div {
    width: 106px;
    height: 142px;
    border-radius: 10px;
    object-fit: cover;
    position: relative;
    background-size: cover;
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  }
`;

const AvatarMale = styled.div`
  background: url(${process.env.PUBLIC_URL + '/images/Chatbot/avatar-male.svg'})
    no-repeat center fixed;
  ${({ selected }) =>
    selected &&
    `
    width: 140px !important;
    height: 180px !important;
  `}
`;
const AvatarFemale = styled.div`
  background: url(${process.env.PUBLIC_URL +
    '/images/Chatbot/avatar-female.svg'})
    no-repeat center fixed;
  ${({ selected }) =>
    selected &&
    `
    width: 140px !important;
    height: 180px !important;
  `}
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ChatbotModalSecond = ({ isOpen, handlePrev, handleNext }) => {
  const selectedAvatar = useStore((state) => state.selectedAvatar);
  const setSelectedAvatar = useStore((state) => state.setSelectedAvatar);
  const clickMale = () => {
    setSelectedAvatar(0);
  };
  const clickFemale = () => {
    setSelectedAvatar(1);
  };

  return (
    <Modal isOpen={isOpen} style={customModalStyles}>
      <ModalTitle>올봄 챗봇의 캐릭터를 선택해주세요 !</ModalTitle>
      <ModalContent>
        <AvatarMale onClick={() => clickMale()} selected={selectedAvatar === 0}>
          {selectedAvatar === 1 && <Overlay />}
        </AvatarMale>
        <AvatarFemale
          onClick={() => clickFemale()}
          selected={selectedAvatar === 1}
        >
          {selectedAvatar === 0 && <Overlay />}
        </AvatarFemale>
      </ModalContent>
      <ButtonWrapper>
        <Button
          text={'취소'}
          size="Small"
          height="Short"
          type="Back"
          fontSize={24}
          onClick={handlePrev}
        />
        <Button
          text={'다음'}
          size="Small"
          height="Short"
          type="Primary"
          fontSize={24}
          onClick={handleNext}
        />
      </ButtonWrapper>
    </Modal>
  );
};

export default ChatbotModalSecond;
