import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import topNav from '@/components/topNav'
import content from '@/components/content'
import footer from '@/components/footer'
import framewrok from '@/views/framework'
import home from '@/views/home'

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
      path: '/',
      component: framewrok,
      children: [{
        path: '/',
        components: {
          header: topNav,
          content: content,
          footer: footer
        },
        children: [
          {
            path: 'home',
            name: 'home',
            component: home
          },
          {
            path: 'orderList',
            name: 'orderList',
            component: () => import('@/views/order/orderList.vue')
          },
          {
            path: 'orderItem/:id',
            name: 'orderItem',
            component: () => import('@/views/order/orderItem.vue')
          }
        ]
      }
      ]
    }
  ]
})
