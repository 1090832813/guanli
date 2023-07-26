import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../layout/layout.vue'

const mainCourse =() => import('../views/mainCourse/mainCourse.vue').catch(()=>{})
const videos =() => import('../views/videos/videos.vue').catch(()=>{})
const chapter =() => import('../views/chapter/chapter.vue').catch(()=>{})
const model =() => import('../views/model/model.vue').catch(()=>{})
const info =() => import('../views/info/info.vue').catch(()=>{})
const vip =() => import('../views/vipUser/vip.vue').catch(()=>{})
const log =() => import('../views/loginLog/log.vue').catch(()=>{})
const chart=() => import('../views/chart/chart.vue').catch(()=>{})
const superUser=() => import('../views/superUser/superUser.vue').catch(()=>{})
Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/home',
    name:'home',
    redirect:'chart',
    component: Home,
    children:[
      {
        path:'chart',
        name:'统计信息',
        component: chart,
      }
    ]
  },
  {
    path:'/home',
    name:'home',

    component: Home,
    children:[
      {
        path:'mainCourse',
        name:'主课程管理',
        component: mainCourse,
      }
    ]
  },
  
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'chapter',
        name:'章节管理',
        component: chapter,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'videos',
        name:'视频管理',
        component: videos,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'model',
        name:'模块管理',
        component: model,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'vip',
        name:'vip用户',
        component: vip,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'log',
        name:'登录日志',
        component: log,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'superUser',
        name:'管理员',
        component: superUser,
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    children:[
      {
        path:'info',
        name:'用户信息',
        component: info,
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
