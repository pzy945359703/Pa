import { _axios, baseUrl } from '@/plugins/axios'

export function getAllContent() {
  return _axios.request({
    url: baseUrl + 'content/listAll',
    method: 'post',
    data: {}
  })
}

export function updateContent() {
  return _axios.request({
    url: baseUrl + 'content/upload',
    method: 'post',
    data: {}
  })
}
