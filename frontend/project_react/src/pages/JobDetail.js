import styled from 'styled-components';

const JobDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  box-sizing: border-box;
  padding: 50px 20px 0 20px;
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
  flex-direction: column;
  gap: 20px;
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
`;

const InfoItemTitle = styled.div`
  width: fit-content;
  padding: 4px 14px;
  font-weight: bold;
  font-size: 20px;
  color: var(--unselected-color);
  border: 2px solid var(--unselected-color);
  border-radius: 30px;
`;

const DateWrapper = styled(InfoItemTitle)`
  color: var(--error-color);
  border: 2px solid var(--error-color);
`;

const ContentText = styled.span`
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`;
const ContentItem = styled.div`
  display: flex;
  gap: 6px;
`;

const ContentTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const JobDetailPage = () => {
  const gun =
    ' * 인원 : 내부 미화원 1명 - 근무 시간 : 평일 09:00 ~ 15:30 (휴게 1시간) 토요일 09:00 ~ 10:30 - 급여 : 1,478,120 월';
  return (
    <JobDetailContainer>
      <JobDetailHeader>
        <img src={process.env.PUBLIC_URL + '/images/JobPage/arrow-back.svg'} />
        <HeaderTitle>엘림에스(유)</HeaderTitle>
      </JobDetailHeader>
      <JobDetailContent>
        <CompanyLogo
          src={process.env.PUBLIC_URL + '/images/JobPage/company-logo.svg'}
        />
        <EmploymentTitle>
          인천 만수한국아파트 미화원 채용합니다. (장애인등록증 또는
          장애인복지카드 소지자 우대)
        </EmploymentTitle>
        <EmploymentInfo>
          <InfoItem>
            <DateWrapper>D - 4</DateWrapper>
            <InfoItemContentHorizontal>
              <InfoItemTitle>모집 직종</InfoItemTitle>
              <ContentText>단체 급식 보조원</ContentText>
            </InfoItemContentHorizontal>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>지원 자격</InfoItemTitle>
              <ContentWrapper>
                <ContentItem>
                  <ContentTitle>경력:</ContentTitle>
                  <ContentText>관계 없음</ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>학력:</ContentTitle>
                  <ContentText>관계 없음</ContentText>
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
                  <ContentText>
                    인천광역시 남동구 담방로21번, 단지 내부 (만수동, 한국
                    아파트)
                  </ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>임금:</ContentTitle>
                  <ContentText>월급 147만원 ~ 147만원</ContentText>
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
                  <ContentText>기간의 정합이 있는 근로계약</ContentText>
                </ContentItem>
                <ContentItem>
                  <ContentTitle>근무형태:</ContentTitle>
                  <ContentText>주 6일 근무</ContentText>
                </ContentItem>
              </ContentWrapper>
            </InfoItemContent>
          </InfoItem>
          <InfoItem>
            <InfoItemContent>
              <InfoItemTitle>직무 내용</InfoItemTitle>
              <ContentWrapper>
                <ContentText>
                  여기는 데이터 넘어오는거 봐야 알 수 있을 것 같음요.
                </ContentText>
                <ContentText>{gun}</ContentText>

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
