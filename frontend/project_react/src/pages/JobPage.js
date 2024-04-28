import styled from 'styled-components';
import { useState } from 'react';
import JobDropdown from '../components/JobPage/Dropdown';
import JobPageHeader from '../components/Header/JobPageHeader';
import JobEmploymentItem from '../components/JobPage/EmploymentItem';
import Pagination from 'react-js-pagination';

const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 18px;
  gap: 8px;
`;

const JobPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  gap: 24px;
  box-sizing: border-box;
`;

const EmploymentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 24px;
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    //margin-top: 15px;
    //border: 1px solid red;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    width: 40px;
    height: 40px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: var(--primary-color);
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: var(--primary-color);
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: var(--primary-color);
  }
`;

const JobPage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
  };
  const [data, setData] = useState([]);
  const [items, setItems] = useState(5);

  const dummyData = [
    {
      id: 1,
      company: '엘림에스(유)',
      title: '단체 급식 보조원',
      content:
        '인천 만수한국아파트 미화원 채용합니다.(장애인 등록증 또는 장애인복지카드 장애인복지카드 장애인복지카드 장애인복지카드 장애인복지카드 장애인복지카드 장애인복지카드 장애인복지카드',
    },
    {
      id: 2,
      company: '엘림에스(유)',
      title: '단체 급식 보조원',
      content:
        '인천 만수한국아파트 미화원 채용합니다.(장애인 등록증 또는 인천 만수한국아파트 미화원 채용합니다.(장애인 등록증 또는 인천 만수한국아파트 미화원 채용합니다.(장애인 등록증 또는 ',
    },
    {
      id: 3,
      company: '희건히',
      title: '개밥 주기',
      content: '애완견 산책 도우미 채용합니다. (애완견 등록증 필수)',
    },
    {
      id: 4,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 5,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 6,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 7,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 8,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 9,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 10,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
    {
      id: 11,
      company: '희건희건희',
      title: '산책',
      content: '개 키우는 사람 ~',
    },
  ];

  return (
    <JobContainer>
      <JobPageHeader />
      <JobPageContent>
        <JobDropdown toggleFilter={toggleFilter} openFilter={openFilter} />
        <EmploymentWrapper>
          <JobEmploymentItem dummyData={dummyData} />
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={300}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </EmploymentWrapper>
      </JobPageContent>
    </JobContainer>
  );
};

export default JobPage;
