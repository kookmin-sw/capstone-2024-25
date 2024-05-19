// components/Layout/Layout.tsx
import styled from 'styled-components';
import Footer from './Footer';
import { useEffect } from 'react';

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
    //height: 100%;
    height: ${(props) => (!props.fromJob ? '100%' : 'calc(100vh - 78px)')};
    border: 1px solid red;
  }
`;

const Layout = ({ children, fromJob }) => {
  useEffect(() => {
    console.log('Layout fromJob : ', fromJob);
  }, []);
  return (
    <LayoutContainer>
      {/*{fromJob ? (*/}
      {/*  <mainFromJob>{children}</mainFromJob>*/}
      {/*) : (*/}
      {/*  <main>{children}</main>*/}
      {/*)}*/}
      <main fromJob={fromJob}>{children}</main>

      <Footer fromJob={fromJob} />
    </LayoutContainer>
  );
};

export default Layout;
