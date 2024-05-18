export const convertRegionName = (shortName) => {
  const regionMap = {
    SEOUL: '서울',
    BUSAN: '부산',
    DAEGU: '대구',
    INCHEON: '인천',
    GWANGJU: '광주',
    DAEJEON: '대전',
    ULSAN: '울산',
    SEJONG: '세종',
    GYEONGGI: '경기',
    CHUNGBUK: '충북',
    CHUNGNAM: '충남',
    JEONNAM: '전남',
    JEONBUK: '전북',
    GYEONGNAM: '경남',
    GYEONGBUK: '경북',
    JEJU: '제주',
    GANGWON: '강원',
  };

  // 입력된 짧은 이름을 기반으로 전체 이름을 반환
  return regionMap[shortName] || '알 수 없는 지역';
};
