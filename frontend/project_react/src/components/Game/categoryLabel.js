import styled from 'styled-components';

export default function CategoryLabel({children }) {
  return <StyledCategoryLabel >{children}</StyledCategoryLabel>;
}

const StyledCategoryLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  font-size: 48px;
  font-weight: bold;
  border-radius: 12px;
  border: 1px solid #000000;
  box-shadow: 0px 8px 10px -6px rgb(102, 102, 102);
`;