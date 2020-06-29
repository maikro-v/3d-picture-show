import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from '@/plugins'
import '@/styles/index.scss'
import 'h5-rem'

// 注册插件
plugins(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
