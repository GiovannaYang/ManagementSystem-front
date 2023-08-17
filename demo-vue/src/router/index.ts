import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/aregister',
    name: 'aregister',
    component: () => import('../views/register/ARegister.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage/Manage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile.vue')
  },
  {
    path: '/asetting',
    name: 'asetting',
    component: () => import('../views/setting/AdminSetting.vue')
  },
  {
    path: '/usetting',
    name: 'usetting',
    component: () => import('../views/setting/UserSetting.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('../views/modify/Modify.vue')
  },
  {
    path: '/stupass',
    name: 'stupass',
    component: () => import('../views/forget/Stupass.vue')
  },
  {
    path: '/adminpass',
    name: 'adminpass',
    component: () => import('../views/forget/Adminpass.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/forget/Forget.vue')
  },
  {
    path: '/class',
    name: 'class',
    component: () => import('../views/manage1/Class.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
