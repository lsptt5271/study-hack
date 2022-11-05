import { setCookie } from 'nookies';

const setAccessToken = <T extends { token: string; exp: number }>(data: T) => {
  setCookie(null, 'accessToken', data.token, {
    expires: new Date(data.exp * 1000),
  });
};

export default setAccessToken;
