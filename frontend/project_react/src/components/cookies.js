import { useCookies } from 'react-cookie';

export function useAccessToken() {
  const [cookies] = useCookies(['accessToken']);
  return cookies.accessToken;
}
