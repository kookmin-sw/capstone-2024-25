// components/Layout/Layout.tsx
import styled from 'styled-components';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  main {
    width: 100%;
    //height: calc(100vh - 78px);
    height: 100%;
    // height: ${(props) => (!props.fromJob ? '100%' : 'calc(100vh - 78px)')};
  }
`;

const MainFromJob = styled.main`
  width: 100%;
  //height: 100%;
  height: calc(100vh - 78px);
`;
const Layout = ({ children, fromJob }) => {
  const [isFromJob, setIsFromJob] = useState(false);
  useEffect(() => {
    if (fromJob) {
      setIsFromJob(true);
    }
    console.log('Layout fromJob : ', fromJob);
  }, []);
  return (
    <LayoutContainer>
      {/*{fromJob ? (*/}
      {/*  <mainFromJob>{children}</mainFromJob>*/}
      {/*) : (*/}
      {/*  <main>{children}</main>*/}
      {/*)}*/}
      {isFromJob ? (
        <MainFromJob>{children}</MainFromJob>
      ) : (
        <main>{children}</main>
      )}
      {/*// <main fromJob={fromJob}>{children}</main>*/}
      <Footer fromJob={fromJob} />
    </LayoutContainer>
  );
};

export default Layout;
