import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import register from '@/views/register'
import topNav from '@/components/topNav'
import content from '@/components/content'
import footer from '@/components/footer'
import framewrok from '@/views/framework'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      component: framewrok,
      children: [{
        path: '/',
        components: {
          header: topNav,
          content: content,
          footer: footer
        },
        redirect: 'index',
        children: [
          {
            path: 'index/:showAll/:queryName',
            name: 'index',
            component: () => import('@/views/home.vue')
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
          },
          {
            path: 'personalCenter/changePassword',
            name: 'changePassword',
            component: () => import('@/views/personalCenter/changePassword.vue')
          },
          {
            path: 'project/:id',
            name: 'projectItem',
            component: () => import('@/views/project/project.vue')
          },
          {
            path: 'projectComment/:id',
            name: 'projectComment',
            component: () => import('@/views/project/comment.vue')
          }
        ]
      }
      ]
    }
  ]
})
