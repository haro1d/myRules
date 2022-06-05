//注册全局组件
/*  单个注册：
import has from '@/components/global/has'
Vue.component('has',has)
*/
export default {
    install(Vue){
        let allCom = require.context('./', false, /\.vue$/)
        allCom.keys().forEach(item => {
            Vue.component(item.replace(/\.\//,'').replace(/\.vue$/,''),allCom(item).default)
        });
    }
}