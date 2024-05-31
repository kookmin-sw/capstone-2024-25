// JobPage.js
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import JobDropdown from '../components/JobPage/Dropdown';
import JobPageHeader from '../components/Header/JobPageHeader';
import JobEmploymentItem from '../components/JobPage/EmploymentItem';
import Pagination from 'react-js-pagination';
import { jobApis } from '../api/apis/jobApis';
import { useCookies } from 'react-cookie';
import { convertRegionName } from '../utils/handleJob';
import Layout from '../layouts/Layout';

const JobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px;
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
  margin-bottom: 40px;
`;

const EmploymentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 24px;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  box-sizing: border-box;
  .pagination {
    display: flex;
    justify-content: center;
    max-width: 80%;
    box-sizing: border-box;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    max-width: 44px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 8px;
    &:first-child {
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
  ul.pagination li a.active {
    border: 1px solid #e2e2e2;
  }
`;

const JobPage = () => {
  const [jobList, setJobList] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [sorted, setSorted] = useState(0);
  const [jobName, setJobName] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [region, setRegion] = useState('서울');
  const [maxPage, setMaxPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const accessToken = cookies.accessToken;

  useEffect(() => {
    getJobList();
  }, []);

  const searchJob = async () => {
    await jobApis.searchJob(jobName, page - 1, accessToken).then((res) => {
      setJobList(res.data.jobListResponses);
      setMaxPage(res.data.totalJobSize / 10 + 1);
      setTotalCount(res.data.totalJobSize);
    });
  };

  const getJobList = async () => {
    await jobApis.getJobList(sorted, page - 1, accessToken).then((res) => {
      setJobList(res.data.jobListResponses); // id, companyName, title, occupation
      setMaxPage(res.data.totalJobSize / 10 + 1);
      setTotalCount(res.data.totalJobSize);
      setRegion(convertRegionName(res.data.province));
    });
  };

  useEffect(() => {
    const jobContent = document.getElementById('job-content');
    if (jobContent) {
      jobContent.scrollTo(0, 0);
    }
  }, [jobList]);

  useEffect(() => {
    getJobList();
  }, [page, sorted]);

  useEffect(() => {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      pagination.firstChild.firstChild.innerHTML = '처음';
      pagination.firstChild.nextElementSibling.firstChild.innerHTML = '이전';
      pagination.lastChild.firstChild.innerHTML = '마지막';
      pagination.lastChild.previousElementSibling.firstChild.innerHTML = '다음';
    }
  }, [page, jobList]);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <Layout>
      <JobContainer>
        <JobPageHeader
          jobName={jobName}
          setJobName={setJobName}
          searchJob={searchJob}
        />
        <JobPageContent id="job-content">
          <JobDropdown
            toggleFilter={toggleFilter}
            openFilter={openFilter}
            sorted={sorted}
            setSorted={setSorted}
            setOpenFilter={setOpenFilter}
            region={region}
          />
          <EmploymentWrapper>
            {jobList.length !== 0 && (
              <>
                <JobEmploymentItem jobList={jobList} />
                <PaginationBox>
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalCount}
                    pageRangeDisplayed={maxPage < 4 ? totalCount : 4}
                    onChange={handlePageChange}
                  ></Pagination>
                </PaginationBox>
              </>
            )}
          </EmploymentWrapper>
        </JobPageContent>
      </JobContainer>
    </Layout>
  );
};

export default JobPage;
