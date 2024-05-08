import { myPagaApis } from '../api/apis/myPagaApis';

export const getUserInfo = async (
  accessToken,
  setUserInfo,
  setUserName,
  setUserGender,
) => {
  await myPagaApis.getInfo(accessToken).then((res) => {
    if (res.status === 200) {
      setUserInfo(res.data);
      if (setUserName) {
        setUserName(res.data.name);
      }
      if (setUserGender) {
        setUserGender(res.data.gender);
      }
    }
  });
};
