// JobDetail2.js
import styled from 'styled-components';
import { jobApis } from '../api/apis/jobApis';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const JobDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

const JobDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

// const JobDetailContent = styled.div`
//   border: 1px solid #ccc;
//   padding: 10px;
//   margin-top: 10px;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   iframe {
//     -moz-transform: scale(1);
//     -moz-transform-origin: 0 0;
//
//     -o-transform: scale(1);
//     -o-transform-origin: 0 0;
//
//     -webkit-transform: scale(0.5);
//     -webkit-transform-origin: 0 0;
//
//     transform: scale(0.5);
//     transform-origin: 0 0;
//
//     border: 1px solid #ccc;
//     top: 0px;
//     left: 0px;
//
//     width: 200%;
//     height: 200%;
//   }
// `;

const JobDetailContent = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  iframe {
    transform: scale(0.25); // 50% 크기로 축소

    transform-origin: 0 0;

    border: 1px solid #ccc;
    top: 0px;
    left: 0px;

    width: 400%;
    height: 400%;
  }
`;
// const JobDetailContent = styled.div`
//   display: flex;
//   height: 100%;
//   flex-direction: column;
//   gap: 20px;
//   overflow-y: auto;
//   #inner-frame {
//     transform: scale(1);
//     transform-origin: 0 0; /* 확대 축소의 기준점을 왼쪽 상단으로 설정 */
//     zoom: 5;
//     div {
//       border: 1px solid red;
//     }
//   }
// `;

const JobDetailPage2 = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setAddress(location.state.worknetUrl);
      setCompanyName(location.state.companyName);
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setAddress(location.state.worknetUrl);
      setCompanyName(location.state.companyName);
    }
  }, [location.state]); // location.state를 의존성 배열에

  return (
    <JobDetailContainer>
      <JobDetailHeader>
        <img
          src={process.env.PUBLIC_URL + '/images/JobPage/arrow-back.svg'}
          onClick={() => {
            navigate(-1);
          }}
        />
        <HeaderTitle>{companyName}</HeaderTitle>
      </JobDetailHeader>
      <JobDetailContent>
        <iframe
          // id="inner-frame"
          // src={address}
          src={address}
          // title="External Content"
          width="100%"
          height="100%"
          // style={{ border: 'none' }} // 테두리 없애기
          frameborder="0"
        ></iframe>
      </JobDetailContent>
    </JobDetailContainer>
  );
};

export default JobDetailPage2;
