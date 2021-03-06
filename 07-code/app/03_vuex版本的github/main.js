// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App'
// 引入store
import store from './store'
// 设置浏览器的控制台不提示默认信息
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 注册Vuex的仓库
  store
})
