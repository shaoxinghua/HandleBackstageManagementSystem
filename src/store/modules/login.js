const state = {
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false
};

const  mutations = {
  setCollapse:state=>{
     state.isCollapse = !state.isCollapse
    //  console.log(state.isCollapse)
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
  }
};

export default {
  namespaced:true,
  state,
  mutations,
}