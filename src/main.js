// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import axios from 'axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)  //完成 Element 的引入
// Vue.prototype.$deploy_url = 'http://127.0.0.1:9090/api/'
Vue.prototype.$deploy_url = 'http://172.17.221.66:9090/api/'
Vue.prototype.$echarts = echarts

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   document.title = '笑哼的图像识别评测系统'
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
