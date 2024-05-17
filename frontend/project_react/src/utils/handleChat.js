export const weatherRequest = () => {
  return `날씨 알려줘`;
};
export const newsRequest = (keyword) => {
  if (keyword === '') return `오늘 뉴스 알려줘.`;
  return `오늘 ${keyword} 뉴스 알려줘.`;
};

export const cultureRequest = (keyword) => {
  if (keyword === '공원') {
    return `${keyword} 소개해줘.`;
  } else {
    return `${keyword} 시설 소개해줘.`;
  }
};

export const serviceRequest = (keyword) => {
  return `방문${keyword}서비스 소개해줘.`;
};

export const parseNewsData = (rawData) => {
  try {
    // 첫 번째 단계: 이중 백슬래시를 단일 백슬래시로 바꿉니다.
    let correctedString = rawData.replace(/\\\\/g, '\\');

    // 두 번째 단계: 잘못된 따옴표 처리를 수정합니다.
    correctedString = correctedString.replace(
      /(?<=[:\[,{]\s*)'([^']+)'(?=\s*[:,\]}])/g,
      '"$1"',
    );

    // 세 번째 단계: 모든 싱글 따옴표를 이중 따옴표로 변경합니다.
    correctedString = correctedString.replace(/'/g, '"');

    // JSON 객체로 파싱합니다.
    const jsonData = JSON.parse(correctedString);

    return jsonData;
  } catch (error) {
    console.error('Error parsing JSON data: ', error);
    return null;
  }
};
