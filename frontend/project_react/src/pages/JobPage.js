// JobPage.js
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import JobDropdown from '../components/JobPage/Dropdown';
import JobPageHeader from '../components/Header/JobPageHeader';
import JobEmploymentItem from '../components/JobPage/EmploymentItem';
import Pagination from 'react-js-pagination';
import { jobApis } from '../api/apis/jobApis';
import { useCookies } from 'react-cookie';

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
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 24px;
  padding-bottom: 20px;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  box-sizing: border-box;
  //border: 1px solid green;
  .pagination {
    display: flex;
    justify-content: center;
    //align-self: center;
    max-width: 80%;
    box-sizing: border-box;
    //margin-top: 15px;
    //border: 1px solid red;
  }
  ul {
    list-style: none;
    padding: 0;
    //border: 1px solid red;
  }
  ul.pagination li {
    //width: 40px;
    max-width: 44px;
    height: 40px;
    //border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 8px;
    &:first-child {
      // 맨 앞 버튼
      //background-color: red;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
    }
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
  //ul.pagination li a:hover,
  ul.pagination li a.active {
    border: 1px solid #e2e2e2;

    //color: var(--primary-color);
  }
`;

const JobPage = () => {
  const [jobList, setJobList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [sorted, setSorted] = useState(0);
  const [jobName, setJobName] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const searchJob = async () => {
    await jobApis.searchJob(jobName, page - 1, accessToken).then((res) => {
      setJobList(res.data);
      console.log('searchJob res.data : ', res.data);
    });
  };

  const getJobList = async () => {
    await jobApis.getJobList(sorted, page - 1, accessToken).then((res) => {
      setJobList(res.data); // id, companyName, title, occupation
    });
  };

  useEffect(() => {
    getJobList();
  }, []);

  useEffect(() => {
    getJobList();
  }, [page, sorted]);

  useEffect(() => {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      // pagination.firstChild.innerHTML =
      //   '<span style="max-width: 12px; color: var(--primary-color)">처음</span>';
      pagination.firstChild.firstChild.innerHTML = '처음';
      pagination.firstChild.nextElementSibling.firstChild.innerHTML = '이전';
      pagination.lastChild.firstChild.innerHTML = '마지막';
      pagination.lastChild.previousElementSibling.firstChild.innerHTML = '다음';

      // pagination.firstChild.firstChild.clientWidth = '20px;';
      // pagination.firstChild.style.width = '10px';
      // pagination.firstChild.firstChild.style.boxSizing = 'border-box';
      // pagination.firstChild.firstChild.innerHTML.style.padding = '0 !important';

      // pagination.firstChild.firstChild.style.padding = '0 !important';
      // pagination.firstChild.nextElementSibling.innerHTML =
      //   '<span style="max-width: 20px; color: var(--primary-color)">이전</span>';
      // pagination.firstChild.nextElementSibling.firstChild.style.padding =
      //   '0 !important';
    }
  }, [page]);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <JobContainer>
      <JobPageHeader
        jobName={jobName}
        setJobName={setJobName}
        searchJob={searchJob}
      />
      <JobPageContent>
        <JobDropdown
          toggleFilter={toggleFilter}
          openFilter={openFilter}
          sorted={sorted}
          setSorted={setSorted}
          setOpenFilter={setOpenFilter}
        />
        <EmploymentWrapper>
          <JobEmploymentItem jobList={jobList} />
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={4}
              totalItemsCount={3000}
              pageRangeDisplayed={4}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </EmploymentWrapper>
      </JobPageContent>
    </JobContainer>
  );
};

export default JobPage;
