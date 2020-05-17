// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(ElementUI, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, form, next) => {
  if (to.name === 'login') {
    sessionStorage.removeItem('userInfo')
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const user = JSON.parse(sessionStorage.getItem('userInfo'))
  if (!user && (to.name !== 'register' && to.name !== 'login')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

