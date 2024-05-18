// EmploymentItem.js
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EmploymentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px 20px;
  border: 1px solid #000000;
  border-radius: 12px;
  box-sizing: border-box;
  gap: 8px;
`;

const EmploymentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`;

const EmploymentTitle = styled.span`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ababab;
`;

const EmploymentContent = styled.div`
  width: 100%;
  word-break: break-all;
  // 두 줄이 넘어가면 .. 으로 표시되도록
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const JobEmploymentItem = ({ jobList }) => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    // jobList가 배열인지 확인 후 상태 업데이트
    if (Array.isArray(jobList)) {
      setNewList(jobList);
    } else {
      console.error('jobList is not an array:', jobList);
      setNewList([]); // jobList가 배열이 아니면 빈 배열로 설정
    }
  }, [jobList]);
  const itemClick = (id) => {
    navigate(`/job-detail/${id}`);
  };

  return (
    <>
      {newList.length !== 0 &&
        newList.map((data) => (
          <EmploymentItem id={data.id} onClick={() => itemClick(data.id)}>
            <EmploymentHeader>
              <img src={process.env.PUBLIC_URL + 'images/JobPage/tie.svg'} />
              {data.companyName}
            </EmploymentHeader>
            <EmploymentTitle>{data.title}</EmploymentTitle>
            <HorizontalLine />
            <EmploymentContent>{data.occupation}</EmploymentContent>
          </EmploymentItem>
        ))}
    </>
  );
};
export default JobEmploymentItem;
