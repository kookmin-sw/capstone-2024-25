// ComponentTest.js

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

const ComponentTest = () => {
  function testFun() {
    var data = {
      voice: {
        languageCode: 'ko-KR',
      },
      input: {
        text: 'gml',
      },
      audioConfig: {
        audioEncoding: 'mp3',
      },
    };
    $.ajax({
      type: 'POST',
      url: 'https://texttospeech.googleapis.com/v1/text:synthesize?key=여기에는키를넣으세요!',
      data: JSON.stringify(data),
      dataType: 'JSON',
      contentType: 'application/json; charset=UTF-8',
      success: function (res) {
        $('#textVal').val(res.audioContent);
        var audioFile = new Audio();
        let audioBlob = base64ToBlob(res.audioContent, 'mp3');
        audioFile.src = window.URL.createObjectURL(audioBlob);
        audioFile.playbackRate = 1; //재생속도
        audioFile.play();
      },
      error: function (request, status, error) {
        alert('오류', '오류가 발생하였습니다. 관리자에게 문의해주세요.');
      },
    });
  }

  function base64ToBlob(base64, fileType) {
    let typeHeader = 'data:application/' + fileType + ';base64,'; // base64 헤더 파일 유형 정의
    let audioSrc = typeHeader + base64;
    let arr = audioSrc.split(',');
    let array = arr[0].match(/:(.*?);/);
    let mime = (array && array.length > 1 ? array[1] : type) || type;
    // url헤더 제거하고 btye로 변환
    let bytes = window.atob(arr[1]);
    // 예외를 처리하고 0보다 작은 ASCII 코드를 0보다 큰 값으로 변환
    let ab = new ArrayBuffer(bytes.length);
    // 뷰 생성(메모리에 직접): 8비트 부호 없는 정수, 길이 1바이트
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mime,
    });
  }

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
        <Toggle text="Large Selected" size="Large" selected={true} />
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
