import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.BASE_URL
      : 'http://localhost:4000',
});

export const reqPostJoin = (userInfo) => {
  return api.post('/join', userInfo);
};

export const reqPostLogin = (email, password) => {
  return api.post(
    '/login',
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );
};

export const reqGetLogout = () => {
  return api.get('/logout', {
    withCredentials: true,
  });
};

export const reqGetAuth = () => {
  return api.get('/auth', {
    withCredentials: true,
  });
};

export const reqGetNicknameCheck = (nickname) => {
  return api.get('/user/nickname', {
    params: {
      nickname,
    },
  });
};
