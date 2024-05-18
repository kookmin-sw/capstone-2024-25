import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useStore from '../stores/store';
import { myPagaApis } from '../api/apis/myPagaApis';
import { useCookies } from 'react-cookie';
import { getUserInfo } from '../utils/handleUser';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  border: 1px solid #d9d9d9;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 100;
`;

const Divider = styled.div`
  width: 36px;
  background: none;
  border: none;
`;

const FooterChatBot = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${(props) => props.imgSrc}) no-repeat center/cover;
  position: absolute;
  bottom: 8px;
  right: 50%;
  transform: translateX(50%);
`;

// 수정된 Footer 컴포넌트
const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isGameOn, setIsGameOn] = useState(false);
  const [isJobOn, setIsJobOn] = useState(false);
  const [isClockOn, setIsClockOn] = useState(false);
  const [isMapOn, setIsMapOn] = useState(false);
  const [chatBotImg, setChatBotImg] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const setMainImg = async () => {
    await myPagaApis.getInfo(accessToken).then((res) => {
      console.log('res.data : ', res.data);
      if (pathname.startsWith('/chatbot')) {
        setChatBotImg(
          process.env.PUBLIC_URL + '/images/Footer/footer-chatbot.svg',
        );
      } else {
        if (res.data.chatProfileImageUrl === null) {
          // 나중에 아바타 이미지로 변경
          setChatBotImg(
            process.env.PUBLIC_URL + '/images/Footer/footer-chatbot.svg',
          );
        } else {
          setChatBotImg(res.data.chatProfileImageUrl);
        }
      }
    });
  };

  useEffect(() => {
    setMainImg();
  }, [pathname]);

  useEffect(() => {
    console.log('pathname 변경');
  }, [pathname]);
  // pathname이 변경될 때만 상태 업데이트 실행
  useEffect(() => {
    setIsGameOn(pathname.startsWith('/game'));
    setIsJobOn(
      pathname.startsWith('/job') || pathname.startsWith('/job-detail'),
    );
    setIsClockOn(pathname.startsWith('/toDo'));
    setIsMapOn(pathname.startsWith('/map'));
  }, [pathname]);

  if (pathname === '/' || pathname === '/sign-up') {
    return null;
  }

  return (
    <FooterContainer>
      {isClockOn ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/clock-on.svg'}
          alt="Clock On"
          onClick={() => {
            navigate('/toDo');
          }}
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/clock-off.svg'}
          alt="Clock Off"
          onClick={() => {
            navigate('/toDo');
          }}
        />
      )}
      {isGameOn ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/game-on.svg'}
          alt="Game On"
          onClick={() => {
            navigate('/game');
          }}
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/game-off.svg'}
          alt="Game Off"
          onClick={() => {
            navigate('/game');
          }}
        />
      )}
      <Divider />
      {isJobOn ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/job-on.svg'}
          alt="Job On"
          onClick={() => {
            navigate('/job');
          }}
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/job-off.svg'}
          alt="Job Off"
          onClick={() => {
            navigate('/job');
          }}
        />
      )}
      {isMapOn ? (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/map-on.svg'}
          alt="Map On"
          onClick={() => {
            navigate('/map');
          }}
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + '/images/Footer/map-off.svg'}
          alt="Map Off"
          onClick={() => {
            navigate('/map');
          }}
        />
      )}
      <FooterChatBot
        imgSrc={chatBotImg}
        onClick={() => {
          navigate('/chatbot');
        }}
      />
    </FooterContainer>
  );
};

export default Footer;
