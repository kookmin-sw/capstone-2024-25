import { api_get } from '../apiWithTryCatch';

export const mapApi = {
  // 지도 관련 api
  getMapMarkers: (bounds) =>
    api_get(process.env.PUBLIC_URL + '/tmpApiData/mapDummy.json', {
      params: {
        bounds: bounds,
      },
    }),
};
