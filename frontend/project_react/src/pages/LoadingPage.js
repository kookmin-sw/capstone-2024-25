import styled from 'styled-components';
import { authApi } from '../api/apis/authApis';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
const LoadingImg = styled.img``;

const LoadingPage = () => {
  const code = new URL(window.location.href).searchParams;
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const kakaoLogin = async () => {
    await authApi.kakaoLogin(code.get('code')).then((res) => {
      setCookie('accessToken', res.data.accessToken);
      if (res.data.hasEssentialInfo === false) {
        navigate('/sign-up', {
          state: {
            isKaKao: true,
          },
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: '로그인 성공',
          confirmButtonText: '확인',
          timer: 1500,
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/chatbot');
          }
        });
      }
    });
  };

  useEffect(() => {
    // 1초 뒤에 실행
    setTimeout(() => {
      kakaoLogin();
    }, 1000);
  }, []);

  return (
    <LoadingContainer>
      <LoadingImg
        src={process.env.PUBLIC_URL + '/images/loading-spinner.gif'}
        alt="spinner"
      />
    </LoadingContainer>
  );
};
export default LoadingPage;
