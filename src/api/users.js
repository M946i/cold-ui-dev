import request from '@/utils/request';

export const getUserInfo = () => request({
  url: 'user/userinfo',
  method: 'get',
  headers: {
    "Content-Type": "application/json;",
    'token': localStorage.getItem('token')
  },
  data() {
    return {
      userInfo: {},
    };
  },
});
export const login = (data) => request({
  url: 'user/login',
  method: 'post',
  data
});
export const logout = () => request({
  url: 'user/logout',
  method: 'post',
  headers: {
    "Content-Type": "application/json;",
    'token': localStorage.getItem('token')
  },
});
//# sourceMappingURL=users.js.map
