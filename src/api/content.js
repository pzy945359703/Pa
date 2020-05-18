import { _axios, baseUrl } from '@/plugins/axios'

export function getAllContent() {
  return _axios.request({
    url: baseUrl + 'content/listAll',
    method: 'post',
    data: {}
  })
}

export function updateContent(data) {
  return _axios.request({
    url: baseUrl + 'content/upload',
    method: 'post',
    data: data
  })
}

export function addContent(data) {
  return _axios.request({
    url: baseUrl + 'content/add',
    method: 'post',
    data: data
  })
}
