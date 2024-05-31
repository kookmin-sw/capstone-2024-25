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
  padding: 12px;
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

const JobDetailContent = styled.div`
  border: 1px solid #ccc;
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

const NewsDetail = () => {
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
  }, [location.state]);

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
          id="inner-frame"
          src={address}
          title="External Content"
          width="100%"
          height="100%"
          style={{ border: 'none' }} // 테두리 없애기
          frameborder="0"
        ></iframe>
      </JobDetailContent>
    </JobDetailContainer>
  );
};

export default NewsDetail;
