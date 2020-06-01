import { _axios, baseUrl } from '@/plugins/axios'

// 获取所有订单
export function getAllOrder() {
  return _axios.request({
    url: baseUrl + '/order/listAll',
    method: 'post',
    data: {}
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

// 获取订单详情
export function getOrderInfo(id) {
  return _axios.request({
    url: baseUrl + 'order/info',
    method: 'post',
    data: { id: id }
  })
}

// 删除订单
export function deleteOrder(id) {
  return _axios.request({
    url: baseUrl + 'order/delByOrderId',
    method: 'post',
    data: { id: id }
  })
}

// 修改订单状态
export function uploadStatus(data) {
  return _axios.request({
    url: baseUrl + 'order/uploadStatus',
    method: 'post',
    data: data
  })
}
