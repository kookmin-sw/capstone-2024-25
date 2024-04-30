import styled from 'styled-components';

const FilterWrapper = styled.div`
  align-self: flex-end;
  gap: 4px;
  position: relative;
`;

const RegionWrapper = styled.div`
  max-height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 12px;
  border: 1px solid #000000;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 16px;
  position: absolute;
  top: 0;
  right: 124px;
  background-color: #ffffff;
`;
const FilterSelect = styled(RegionWrapper)`
  width: fit-content;
  right: 0;
  border: 1px solid #000000;
  overflow: hidden;
  max-height: ${(props) => (props.openFilter ? '108px' : '32px')};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  opacity: 1;
  visibility: visible;
  gap: 8px;
`;

const FilterSelected = styled.div`
  display: flex;
  width: 100%;
  gap: 28px;
`;

const FilterText = styled.span`
  font-size: 16px;
  white-space: nowrap;
`;

const ArrowImg = styled.img`
  ${(props) => (props.openFilter ? 'transform: rotate(-180deg);' : '')}
  transition: transform 0.3s;
`;

const FilterItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  opacity: ${(props) => (props.openFilter ? '1' : '0')};
  visibility: ${(props) => (props.openFilter ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;
  padding: 8px 0;
  gap: 8px;
  border-top: 1px solid #000000;
`;

const JobDropdown = ({ toggleFilter, openFilter }) => {
  return (
    <FilterWrapper>
      <RegionWrapper>서울</RegionWrapper>
      <FilterSelect onClick={() => toggleFilter()} openFilter={openFilter}>
        <FilterSelected>
          <FilterText>거리 순</FilterText>
          <ArrowImg
            src={process.env.PUBLIC_URL + '/images/JobPage/arrow-up.svg'}
            alt="search"
            openFilter={openFilter}
          />
        </FilterSelected>
        <FilterItemWrapper openFilter={openFilter}>
          <FilterSelected>
            <FilterText>거리 순</FilterText>
          </FilterSelected>
          <FilterSelected>
            <FilterText>마감일자 순</FilterText>
          </FilterSelected>
        </FilterItemWrapper>
      </FilterSelect>
    </FilterWrapper>
  );
};
export default JobDropdown;
