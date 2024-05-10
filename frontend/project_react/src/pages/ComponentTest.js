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

export const testFun = (text) => {
  // console.log('testFun');
  // console.log('text : ', text);
  const data = {
    voice: {
      // name: 'ko-KR-Neural2-C', // A : 여자 1, B : 여자 2, C : 남자
      name: 'ko-KR-Neural2-A',
      languageCode: 'ko-KR',
      // ssmlGender: 'MALE',
    },
    input: {
      // text: '아,할아버지, 그럼요. 당연히 손주들을 보고 싶으실 거예요. 요즘 젊은이들은 정말 바쁘죠, 그런데 그들도 할아버지가 그리워하고 있음을 알게 되면 분명히 시간을 내려고 노력할 거예요. 혹시 손주들과 비디오 통화 같은 걸 해보신 적 있으신가요?',
      text: text,
    },
    audioConfig: {
      audioEncoding: 'mp3',
      speakingRate: 1.3,
      pitch: -4,
    },
  };

  axios
    .post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_TTS_KEY}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      },
    )
    .then((response) => {
      const res = response.data;
      const audioBlob = base64ToBlob(res.audioContent, 'audio/mp3');
      const audioFile = new Audio(window.URL.createObjectURL(audioBlob));
      audioFile.playbackRate = 1;
      audioFile.play();
    })
    .catch((error) => {
      console.error('오류 발생: ', error.message);
    });
};

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
  const gun = () => {
    testFun();
  };

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
          onClick={() => {
            testFun();
          }}
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
