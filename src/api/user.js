import { _axios, baseUrl } from '@/plugins/axios'

export function register(param) {
  return _axios.request({
    url: baseUrl + 'user/add',
    method: 'post',
    data: param
  })
}

export function login(param) {
  return _axios.request({
    url: baseUrl + 'user/login',
    method: 'post',
    data: param
  })
}

export function changePassword(param) {
  return _axios.request({
    url: baseUrl + 'user/updatePassword',
    method: 'post',
    data: param
  })
}
