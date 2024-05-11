import instance from '../instance';

export const mapApi = {
  // 지도 관련 api
  getMapMarkers: (accessToken, bounds) => {
    // 남서, 북동 좌표를 받아서 백엔드 데이터 형식에 맞게 정규표현식 적용
    const sw = bounds.sw.match(/-?\d+(\.\d+)?/g).map(Number);
    const ne = bounds.ne.match(/-?\d+(\.\d+)?/g).map(Number);
    console.log('남서', sw[0], '북동', ne[0]);
    return instance.get('api/map', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        swLatitude: sw[0],
        swLongitude: sw[1],
        neLatitude: ne[0],
        neLongitude: ne[1],
      },
    });
  },

  getMarkerInfo: (accessToken, type, id) =>
    instance.get(`api/map/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
