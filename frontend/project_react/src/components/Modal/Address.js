import Modal from 'react-modal';
import styled from 'styled-components';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { expandRegionName } from '../../utils/handleAddress';

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
const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 24px;
`;
const XBtn = styled.img`
  position: absolute;
  width: 24px;
  right: 20px;
  top: 20px;
`;
const Gugu = styled.div`
  overflow: hidden;
  > div {
    width: 100%;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  [id^='__daum__layer_'] {
    width: fit-content !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

const AddressModal = ({
  isOpen,
  closeModal,
  address,
  setAddress,
  saveAddress,
}) => {
  const [modalState, setModalState] = useState(false);
  const xClick = () => {
    closeModal();
  };

  const postCodeStyle = {
    width: '400px',
    height: '500px',
    display: isOpen ? 'block' : 'none',
  }; // 스타일 정의 code
  const onCompletePost = async (data) => {
    setModalState(false);
    const city = data.address.split(' ')[0];
    const newAddress =
      expandRegionName(city) + data.address.substr(city.length);
    setAddress(newAddress);
    if (saveAddress) {
      await saveAddress(newAddress);
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <ModalHeader>
        <ModalTitle>주소 선택</ModalTitle>
        <XBtn
          src={process.env.PUBLIC_URL + '/images/x-img.svg'}
          onClick={xClick}
        />
      </ModalHeader>
      <Gugu>
        <DaumPostcode
          style={postCodeStyle}
          onComplete={onCompletePost}
        ></DaumPostcode>
      </Gugu>
    </Modal>
  );
};
export default AddressModal;
