import axios from 'axios';
import { message } from 'antd';

axios.interceptors.request.use(function (config: any) {
  config.baseURL = 'https://we.lgybetter.com/api/admin';
  config.baseURL = 'http://localhost:7002/api/admin';
  config.headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
  return config;
}, function (error: any) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response: any) {
  const data = response.data;
  response.data = {}
  response.data.code = 200;
  response.data.data = data;
  return response;
}, function (error: any) {
  const { response } = error;
  const { status } = response;  
  if (status === 401) {
    message.info('登录认证失效，请重新登录');
    localStorage.clear();
    return window.location.href = '/admin/signIn';
  }
  const msg = (error.response && error.response.data && error.response.data.message) || '服务器连接异常';
  message.info(msg);
  return Promise.reject({
    code: (error.response && error.response.status) || 500,
    msg
  });
});

export default axios;