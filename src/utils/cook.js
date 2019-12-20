import Cookie from 'cookie_js'

export function getToken(){
  return Cookie.get('admintoken')
}

export function setToken(token){
  return Cookie.set('admintoken',token)
}

export function getUsername(){
  return Cookie.get('username')
}

export function setUsername(username){
  return Cookie.set('username',username)
}