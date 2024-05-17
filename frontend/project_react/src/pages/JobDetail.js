// JobDetail.js
import styled from 'styled-components';
import { jobApis } from '../api/apis/jobApis';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 20px 0 20px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 20px;
`;

const JobDetailButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px;
  gap: 12px;
  color: #ffffff;
  border-radius: 32px;
`;

const MapButton = styled(JobDetailButton)`
  background-color: #8bc34a;
`;

const ShowDetailButton = styled(JobDetailButton)`
  background-color: #000000;
`;

const JobDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.span`
  font-size: 24px;
`;

const JobDetailContent = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const CompanyLogo = styled.img`
  width: 100%;
`;

const EmploymentTitle = styled.span`
  width: 100%;
  word-break: break-all;
  font-size: 20px;
`;

const EmploymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid var(--unselected-color);
  padding: 12px 0;
`;

const InfoItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

const InfoItemContentHorizontal = styled(InfoItemContent)`
  gap: 20px;
  flex-direction: row;
  align-items: center;
`;

const InfoItemTitle = styled.div`
  width: fit-content;
  padding: 4px 14px;
  font-weight: bold;
  font-size: 20px;
  color: var(--unselected-color);
  border: 2px solid var(--unselected-color);
  border-radius: 30px;
  white-space: nowrap;
`;

const DateWrapper = styled(InfoItemTitle)`
  //color: var(--error-color);
  color: ${(props) => props.dateColor};
  //border: 2px solid var(--error-color);
  border: 2px solid ${(props) => props.dateColor};
`;

const ContentText = styled.span`
  font-size: 20px;
  white-space: normal;
  word-break: break-all;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  max-width: 100%;
`;

const ContentItem = styled.div`
  display: flex;
  gap: 6px;
`;

const ContentTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const FloatingButton = styled.a`
  text-decoration-line: none;
`;

const JobDetailPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [jobInfo, setJobInfo] = useState({});
  const [dueState, setDueState] = useState(0);
  const [dateColor, setDateColor] = useState('#000000');
  const { jobId } = useParams();
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (dueState === 0) {
      setDateColor('#000000');
    } else if (dueState === 1) {
      setDateColor('var(--error-color)');
    } else {
      setDateColor('var(--primary-color)');
    }
  }, [dueState]);

  useEffect(() => {
    getJobDetail();
  }, []);

  const getJobDetail = async () => {
    await jobApis.getJobDetail(jobId, accessToken).then((res) => {
      setJobInfo(res.data);
      if (res.data.dday.startsWith('D')) {
        classifyDate(extractDay(res.data.dday));
      }
    });
  };

  const extractDay = (str) => {
    // 숫자 부분 추출
    const number = str.match(/\d+/);
    return number ? number[0] : null;
  };

  const classifyDate = (date) => {
    // 남은 날짜에 따라 색상 변경
    const dateValue = Number(date);
    if (dateValue < 7) {
      setDueState(1);
    } else {
      setDueState(2);
    }
  };

  const extractSuffix = (date) => {
    // 띄어쓰기 조정
    if (date) {
      if (date.startsWith('D')) {
        return date
          .replace(/(D-)\s*(\d+)/g, ' $1 $2')
          .replace(/-\s*(\d+)/g, ' - $1');
      } else {
        return date;
      }
    }
  };

  return (
    <JobDetailContainer>
      <ButtonWrapper>
        <MapButton>
          <img src={process.env.PUBLIC_URL + '/images/JobPage/map.svg'} />
          지도 보기
        </MapButton>
        <FloatingButton href={jobInfo.worknetUrl}>
          <ShowDetailButton>
            <img
              src={process.env.PUBLIC_URL + '/images/JobPage/show-detail.svg'}
            />
            상세 보기
          </ShowDetailButton>
        </FloatingButton>
      </ButtonWrapper>
      <JobDetailHeader>
        <img
          src={process.env.PUBLIC_URL + '/images/JobPage/arrow-back.svg'}
          onClick={() => {
            navigate(-1);
          }}
        />
        <HeaderTitle>{jobInfo.companyName}</HeaderTitle>
      </JobDetailHeader>
      <JobDetailContent>
        <CompanyLogo src={jobInfo.companyImageUrl} />
        <EmploymentTitle>{jobInfo.title}</EmploymentTitle>
        <EmploymentInfo>
          <InfoItem>
            <DateWrapper dateColor={dateColor}>
              {extractSuffix(jobInfo.dday)}
            </DateWrapper>
            <InfoItemContentHorizontal>
              <InfoItemTitle>모집 직종</InfoItemTitle>
              <ContentText>{jobInfo.occupation}</ContentText>
            </InfoItemContentHorizontal>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>지원 자격</InfoItemTitle>
              <ContentWrapper>
                <ContentItem>
                  <ContentTitle>경력:</ContentTitle>
                  <ContentText>{jobInfo.career}</ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>학력:</ContentTitle>
                  <ContentText>{jobInfo.scholarship}</ContentText>
                </ContentItem>
              </ContentWrapper>
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>근무 조건</InfoItemTitle>
              <ContentWrapper>
                <ContentItem>
                  <ContentTitle>지역:</ContentTitle>
                  <ContentText>{jobInfo.address}</ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>임금:</ContentTitle>
                  <ContentText>{jobInfo.pay}</ContentText>
                </ContentItem>
              </ContentWrapper>
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>고용 형태</InfoItemTitle>
              <ContentWrapper>
                <ContentItem>
                  <ContentTitle>고용형태:</ContentTitle>
                  <ContentText>{jobInfo.employmentType}</ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>근무형태:</ContentTitle>
                  <ContentText>{jobInfo.workType}</ContentText>
                </ContentItem>
              </ContentWrapper>
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>직무 내용</InfoItemTitle>
              <ContentWrapper>
                <ContentText>{jobInfo.contents}</ContentText>
                <ContentItem></ContentItem>
              </ContentWrapper>
            </InfoItemContent>
          </InfoItem>
        </EmploymentInfo>
      </JobDetailContent>
    </JobDetailContainer>
  );
};

export default JobDetailPage;
