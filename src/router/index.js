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
      component: register,
      meta: {
        title: '注册'
      }
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
            path: 'myOrderList',
            name: 'myOrderList',
            component: () => import('@/views/order/userOrderList.vue'),
            meta: {
              title: '我的订单'
            }
          },
          {
            path: 'orderList',
            name: 'orderList',
            component: () => import('@/views/order/orderList.vue'),
            meta: {
              title: '订单列表'
            }
          },
          {
            path: 'contentList',
            name: 'contentList',
            component: () => import('@/views/content/contentList.vue'),
            meta: {
              title: '测试内容列表'
            }
          },
          {
            path: 'submitOrder/:projectId',
            name: 'submitOrder',
            component: () => import('@/views/order/submitOrder.vue'),
            meta: {
              title: '确认订单'
            }
          },
          {
            path: 'orderItem/:id',
            name: 'orderItem',
            component: () => import('@/views/order/orderItem.vue'),
            meta: {
              title: '订单详情'
            }
          },
          {
            path: 'personalCenter/changePassword',
            name: 'changePassword',
            component: () => import('@/views/personalCenter/changePassword.vue'),
            meta: {
              title: '修改密码'
            }
          },
          {
            path: 'project/:id',
            name: 'projectItem',
            component: () => import('@/views/project/project.vue'),
            meta: {
              title: '项目详情'
            }
          },
          {
            path: 'projectList',
            name: 'projectList',
            component: () => import('@/views/project/projectList.vue'),
            meta: {
              title: '项目列表'
            }
          },
          {
            path: 'projectDetail/:id',
            name: 'projectDetail',
            component: () => import('@/views/project/projectDetail.vue'),
            meta: {
              title: '项目详情'
            }
          }
        ]
      }
      ]
    }
  ]
})
