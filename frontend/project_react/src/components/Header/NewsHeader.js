import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  align-items: center;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 20px;
  padding: 24px 0;
  border-bottom: 1px solid var(--unselected-color);
  box-sizing: border-box;
  font-weight: 700;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: 1px solid #666666;
  border-radius: 8px;
  box-sizing: border-box;
  gap: 12px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
`;
const JobPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  gap: 24px;
`;

const NewsHeader = ({ jobName, setJobName, searchJob }) => {
  const handleSearch = (e) => {
    setJobName(e.target.value);
  };

  const clickSearch = async () => {
    await searchJob();
    setJobName('');
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = '';
    }
  };

  return (
    <HeaderWrapper>
      <HeaderTitle>장년 일자리</HeaderTitle>
      <SearchWrapper>
        <img
          src={process.env.PUBLIC_URL + '/images/JobPage/search.svg'}
          alt="search"
          onClick={() => {
            clickSearch();
          }}
        />
        <SearchInput
          id="search-input"
          placeholder="직종을 입력하세요"
          onChange={handleSearch}
        />
      </SearchWrapper>
    </HeaderWrapper>
  );
};
export default NewsHeader;
