export default {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "[request]" */ '@/views/login.vue')
}