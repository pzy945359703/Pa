import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import topNav from '@/components/topNav'
import content from '@/components/content'
import footer from '@/components/footer'
import framewrok from '@/views/framework'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: framewrok,
      children: [{
        path: 'index2',
        components: {
          header: topNav,
          content: content,
          footer: footer
        },
        children: [
          {
            path: 'index',
            name: 'index3',
            component: index
          }
        ]
      }]
    }
  ]
})
