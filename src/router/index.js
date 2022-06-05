import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routerList = []
function importAll(r) {
  r.keys().forEach(item=>{
    routerList.push(r(item).default)
  })
}
//require.context:webpack中的方法，三个参数('文件目录', '布尔值：是否检索子文件夹', '正则：命名规范（根据该命名格式进行查找）')
importAll(require.context('./', true, /\.router\.js/))

const routes = [
  ...routerList,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]
const originalPush = VueRouter.prototype.push      //防止多次点击同一路由报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  routes
})

export default router
