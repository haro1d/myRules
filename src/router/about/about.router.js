export default {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "[request]" */ '@/views/About.vue')
}