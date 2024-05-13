import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
const LoadingImg = styled.img``;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <LoadingImg
        src={process.env.PUBLIC_URL + '/images/loading-spinner.gif'}
        alt="spinner"
      />
    </LoadingContainer>
  );
};
export default LoadingPage;
