import {request} from '@/utils/request'

// 获取验证码
export function getCode(data){
  return request({
    method: "post",
    url:'/getSms/',
    data,
  })
}

export function getLogin(data){
  return request({
    method:'post',
    url:'/login/',
    data,
  })
}

export function getRegister(data){
  return request({
    method:'post',
    url:'/register/',
    data,
  })
}