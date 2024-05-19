// ComponentTest.js
import axios from 'axios';

import styled from 'styled-components';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import Category from '../components/Toggle/Category';
import Input from '../components/Input';

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
`;

export const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

const ComponentTest = () => {
  const gun = () => {};

  const text = '텍스트';
  const inputInfo = '정보';
  const infoState = 'error';
  const infoText = '정보텍스트';
  return (
    <>
      {/*<TestWrapper>*/}
      {/*  <Button*/}
      {/*    text="Large Primary"*/}
      {/*    size="Large"*/}
      {/*    height="Tall"*/}
      {/*    type="Primary"*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text="Small Primary"*/}
      {/*    size="Small"*/}
      {/*    height="Short"*/}
      {/*    type="Primary"*/}
      {/*  />*/}
      {/*  <Button text="Large Back" size="Large" height="Tall" type="Back" />*/}
      {/*  <Button text="Small Back" size="Small" height="Short" type="Back" />*/}
      {/*  <Button*/}
      {/*    text="Large Primary Disabled"*/}
      {/*    size="Large"*/}
      {/*    height="Tall"*/}
      {/*    type="Primary"*/}
      {/*    disabled*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text="Small Primary Disabled"*/}
      {/*    size="Small"*/}
      {/*    height="Short"*/}
      {/*    type="Primary"*/}
      {/*    disabled*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text="Large Back Disabled"*/}
      {/*    size="Large"*/}
      {/*    height="Tall"*/}
      {/*    type="Back"*/}
      {/*    disabled*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text="Small Back Disabled"*/}
      {/*    size="Small"*/}
      {/*    height="Short"*/}
      {/*    type="Back"*/}
      {/*    disabled*/}
      {/*  />*/}
      {/*</TestWrapper>*/}
      <TestWrapper>
        <Toggle
          text="Large Selected"
          size="Large"
          selected={true}
          onClick={() => {}}
        />
        <Toggle text="Medium Selected" size="Medium" selected={true} />
        <Toggle text="Small Selected" size="Small" selected={true} />
        <Toggle text="Large Unselected" size="Large" selected={false} />
        <Toggle text="Medium Unselected" size="Medium" selected={false} />
        <Toggle text="Small Unselected" size="Small" selected={false} />
      </TestWrapper>
      <TestWrapper>
        <Category
          text="Selected Primary"
          selected={true}
          color="var(--primary-color)"
        />
        <Category
          text="Unselected Primary"
          selected={false}
          color="var(--primary-color)"
        />
        <Category text="Selected Green" selected={true} color="#379237" />
        <Category text="Unselected Green" selected={false} color="#379237" />
        <Category text="Selected Red" selected={true} color="#ff0000" />
        <Category text="Unselected Red" selected={false} color="#ff0000" />
        <Category text="Selected Blue" selected={true} color="#0000ff" />
        <Category text="Unselected Blue" selected={false} color="#0000ff" />
      </TestWrapper>
      <TestWrapper>
        <Input
          text={text}
          inputInfo={inputInfo}
          infoState={infoState}
          infoText={infoText}
        />
      </TestWrapper>
    </>
  );
};

export default ComponentTest;
