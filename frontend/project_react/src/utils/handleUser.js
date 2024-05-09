import { myPagaApis } from '../api/apis/myPagaApis';
import useStore from '../stores/store';

export const getUserInfo = async (
  accessToken,
  setUserInfo,
  setUserName,
  setGender,
) => {
  await myPagaApis.getInfo(accessToken).then((res) => {
    if (res.status === 200) {
      setUserInfo(res.data);
      if (setUserName) {
        setUserName(res.data.name);
      }
      if (setGender) {
        setGender(res.data.gender === 'MALE' ? 0 : 1);
      }
    }
  });
};
