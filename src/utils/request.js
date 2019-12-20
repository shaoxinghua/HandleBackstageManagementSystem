import axios from 'axios'
import { Message } from 'element-ui';
import { getToken,getUsername } from '@/utils/cook'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:BASEURL,
    timeout:15000,
  })
  // 2.axios拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config=>{
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求（比如登录（token））,必须携带一些特殊的信息
    // 配置请求拦截
    // console.log(config);
    config.headers['tokey']=getToken();
    config.headers['username'] = getUsername();
    // config.headers['sui'] = '66666';

    return config;
  },error => {
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res)
    // 配置响应拦截
    let data = res.data;
    if(data.resCode !== 0){
      Message.error(data.message)
      return Promise.reject(data);
    }else{
      return res;
    }
  },error => {
    return Promise.reject(error);
  })
  // 3.发送真正的网络请求
  return instance(config);
}