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
