import { api_get } from '../crud';
import axios from 'axios';

export const mapApi = {
  // 지도 관련 api
  getMapMarkers: (bounds) => {
    // console.log('위경도 input', bounds);
    // let str = "(33.44248826384709, 126.5657976532336)";
    const sw = bounds.sw.match(/-?\d+(\.\d+)?/g).map(Number);
    const ne = bounds.ne.match(/-?\d+(\.\d+)?/g).map(Number);
    console.log('남서', sw[0], '북동', ne[0]);
    return api_get('api/map', {
      params: {
        swLatitude: sw[0],
        swLongitude: sw[1],
        neLatitude: ne[0],
        neLongitude: ne[1],
      },
    });

  },
};
