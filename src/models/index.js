import apischema from 'apischema';
import axios from 'axios';

const baseURL = 'http://172.20.33.4:12345';
const timeout = 30000;
const http = axios.create({ baseURL, timeout });

// 添加请求拦截器
http.interceptors.request.use((config) => {
  const rtn = config;
  if (config.method === 'get' && config.apiToken) {
    rtn.headers = {
      'X-Access-Token': config.apiToken,
    };
  }
  if (config.data && config.data.apiToken) {
    const content = 'application/json';
    rtn.headers = {
      'X-Access-Token': config.apiToken || config.data.apiToken,
      'Content-Type': content,
    };
  }

  return rtn;
}, error => Promise.reject(error));

// 添加响应拦截器
// http.interceptors.response.use((response) => {
//   if (response.data.status === 401) { // 接口401登录拦截
//     router.push({ path: '/login' });
//   }
//   return response.data;
// }, (error) => {
//   if (error.response.status === 401) { // 接口401登录拦截
//     router.push({ path: '/login' });
//   }
//   Promise.reject(error);
// });

const schema = apischema({ http });

export default schema;
