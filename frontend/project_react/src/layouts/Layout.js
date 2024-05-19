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
`;

const StyledMain = styled.main`
  width: 100%;
  height: calc(100vh - 78px);
`;
const MainFromJob = styled.main`
  width: 100%;
  height: 100%;
`;
const Layout = ({ children, fromJob }) => {
  if (fromJob) {
    return (
      <LayoutContainer>
        <MainFromJob>{children}</MainFromJob>
        <Footer fromJob={fromJob} />
      </LayoutContainer>
    );
  }
  return (
    <LayoutContainer>
      <StyledMain fromJob={fromJob}>{children}</StyledMain>
      <Footer fromJob={fromJob} />
    </LayoutContainer>
  );
};

export default Layout;
