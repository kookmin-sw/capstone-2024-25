import styled from 'styled-components';
import React, { useState } from 'react';
import GamePageHeader from '../components/Header/GamePageHeader';
import Input from '../components/Input';
import JobDropdown from '../components/JobPage/Dropdown';
import TitleHeader from '../components/Header/JobPageHeader';
import JobEmploymentItem from '../components/JobPage/EmploymentItem';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 18px;
  gap: 8px;
  border: 1px solid blue;
`;

const MyPageContent = styled.div`
  width: 100%;
  display: flex;
  padding: 0 30px;
  flex-direction: column;
  gap: 12px;
`;

const EditItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
  border: 1px solid red;
`;

const EditTitle = styled.div`
  align-self: flex-start;
  font-size: 24px;
  margin-bottom: 32px;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <GamePageHeader
        title={'내 정보'}
        showDivider={true}
        showBackButton={true}
      />
      <MyPageContent>
        <EditItem>
          <EditTitle></EditTitle>
        </EditItem>
      </MyPageContent>
    </MyPageContainer>
  );
};

export default MyPage;
