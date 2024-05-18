// components/Layout/Layout.tsx
import styled from 'styled-components';
import Footer from './Footer';

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
    height: calc(100vh - 78px);
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <main>{children}</main>

      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
