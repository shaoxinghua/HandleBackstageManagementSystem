import { getLogin } from '@/api/login'
import { getToken,setToken,getUsername,setUsername } from '@/utils/cook'
const state = {
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false,
  token:getToken()||'',
  username:getUsername()||''
};

const  mutations = {
  setCollapse:state=>{
     state.isCollapse = !state.isCollapse
    //  console.log(state.isCollapse)
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  },
  set_token:(state,value)=>{
    state.token = value;
    setToken(state.token);
  },
  set_username:(state,value)=>{
    state.username = value;
    setUsername(state.username)
  }
};
const actions = {
  getLogin({commit},data){
    return new Promise((resolve,reject)=>{
       getLogin(data).then(res=>{
         resolve(res);
         console.log(res);
         let data = res.data.data;
         commit('set_token',data.token);
         commit('set_username',data.username)
       }).catch(err=>{
         reject(err)
       })
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}