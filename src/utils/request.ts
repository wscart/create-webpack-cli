import axios from 'axios';
process.env.MOCK == 'true' && require('../../mock')

const request = axios.create({
  baseURL: '/', //请求url
  timeout: 3000, //超时处理
  withCredentials: false, //是否跨域
});

request.interceptors.request.use(
  function (config) {
    //在请求发出之前进行一些操作，比如请求头携带内容
    // config.headers["Content-Type"] = "application/json, text/plain";
    // config.headers['authorization'] = localStorage.getItem('token');
    return config;
  },
  function (error) {
    return error;
  },
);

request.interceptors.response.use(
  (response) => {
    // 写一下操作，比如token过期处理
    console.log(response)
    return response;
  },
  (error) => {
    switch (error && error.response && error.response.status) {
      case 400:
        error.message = '请求错误';
        break;
      case 401:
        error.message = '未授权，请登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '未找到访问地址';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器内部错误';
        break;
      case 501:
        error.message = '服务未实现';
        break;
      case 502:
        error.message = '网关错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网关超时';
        break;
      case 505:
        error.message = 'HTTP版本不受支持';
        break;
      default:
    }
    //Do something with response error
    return error;
  },
);

export default request;