import { _axios, baseUrl } from '@/plugins/axios'

// 获取所有订单
export function getAllOrder() {
  return _axios.request({
    url: baseUrl + '/order/listAll',
    method: 'post'
  })
}

// 获取用户订单
export function getAllOrderByUserId(userId) {
  return _axios.request({
    url: baseUrl + 'order/listByUserId',
    method: 'post',
    data: { userId: userId }
  })
}

// 新建订单
export function addOrder(data) {
  return _axios.request({
    url: baseUrl + 'order/add',
    method: 'post',
    data: data
  })
}

