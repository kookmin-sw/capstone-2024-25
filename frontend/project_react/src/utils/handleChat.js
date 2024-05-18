import axios from 'axios';
import { base64ToBlob } from '../pages/ComponentTest';
import useStore from '../stores/store';

export const weatherRequest = () => {
  return `날씨 알려줘`;
};
export const newsRequest = (keyword) => {
  if (keyword === '') return `오늘 뉴스 알려줘`;
  return `오늘 ${keyword} 뉴스 알려줘`;
};

export const cultureRequest = (keyword) => {
  if (keyword === '공원') {
    return `${keyword} 소개해줘`;
  } else {
    return `${keyword} 시설 소개해줘`;
  }
};

export const serviceRequest = (keyword) => {
  return `방문${keyword}서비스 소개해줘`;
};

export const parseNewsData = (rawData) => {
  try {
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error('Error parsing JSON data: ', error);
    return null;
  }
};

export const reverseQnaResponses = (data) => {
  const reversedResponses = [...data.qnaResponses].reverse(); // 배열 복사 후 역순 정렬
  return {
    ...data, // 원본 객체의 다른 프로퍼티를 유지
    qnaResponses: reversedResponses, // 역순으로 정렬된 새 배열을 사용
  };
};

export const googleTTS = (text) => {
  const store = useStore.getState(); // Zustand 스토어에서 상태를 직접 가져오기
  const selectedAvatar = store.selectedAvatar; // 현재 선택된 아바타 타입 가져오기

  let voiceName = 'ko-KR-Neural2-A'; // 기본값 설정
  if (selectedAvatar === 'BOY') {
    voiceName = 'ko-KR-Neural2-C'; // 'BOY'일 경우 남성 음성으로 변경
  } else {
    voiceName = 'ko-KR-Neural2-A'; //
  }

  const data = {
    voice: {
      // name: 'ko-KR-Neural2-C', // A : 여자 1, B : 여자 2, C : 남자
      name: voiceName,
      languageCode: 'ko-KR',
    },
    input: {
      text: text,
    },
    audioConfig: {
      audioEncoding: 'mp3',
      speakingRate: 0.8,
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

export const convertArrayToObjectList = (data) => {
  const keyList = { 시설명: 'location', 전화번호: 'phone', 주소: 'address' };
  const result = [];
  let currentObject = {};

  data.forEach((line, index) => {
    const parts = line.split(': ');
    const keyName = parts[0].trim();
    const value = parts.slice(1).join(': ').trim();

    if (keyName.match(/^\d+\./)) {
      if (index !== 0) {
        result.push(currentObject);
        currentObject = {};
      }
      currentObject[keyList[keyName.replace(/^\d+\.\s*/, '')]] = value;
    } else {
      currentObject[keyList[keyName]] = value;
    }
  });

  result.push(currentObject);
  return result;
};
