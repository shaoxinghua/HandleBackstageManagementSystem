import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from '@/utils/cook'


const Login = ()=> import('@/views/login/Login');
const Layout = ()=> import('@/views/layout/index');
const ConsoleIndex = ()=> import('@/views/console/index');
const InfoIndex = ()=> import('@/views/info/infoIndex');
const InfoCategory = ()=> import('@/views/info/infoCategory');
const UserIndex = ()=> import('@/views/user/userIndex');


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' ,hidden:true,meta:{name:'首页'}},
  { path: '/login', component: Login,hidden:true,meta:{name:'登录'} },
  { path: '/layout', component: Layout,redirect:'/index',meta:{name:'控制台',icon:'normal'},
    children:[
      {path:'/index',component:ConsoleIndex,meta:{name:'首页'}}
    ]
  },
  { path: '/info', component: Layout,meta:{name:'信息管理',icon:'manage'},
    children:[
      {path:'/infoIndex',component:InfoIndex,meta:{name:'信息列表'}},
      {path:'/infoCategory',component:InfoCategory,meta:{name:'信息分类'}}
    ]
  }, 
  { path: '/user', component: Layout,meta:{name:'用户管理',icon:'user'},
    children:[
      {path:'/userIndex',component:UserIndex,meta:{name:'用户列表'}}
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 设置导航守卫
const WhiteRouter = ['/login']

router.beforeEach((to,from,next)=>{
  if(getToken()){
    next()
  }else{
    if(WhiteRouter.indexOf(to.path)!== -1){
      next()
    }else{
      next('/login')
    }
  }
})

export default router
