import { _axios, baseUrl } from '@/plugins/axios'

export function getAllOrder() {
  return _axios.request({
    url: baseUrl + '/order/listAll',
    method: 'post'
  })
}

export function getAllOrderByUserId(userId) {
  return _axios.request({
    url: baseUrl + 'order/listByUserId',
    method: 'post',
    data: { userId: userId }
  })
}
