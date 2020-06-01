import { _axios, baseUrl } from '@/plugins/axios'

export function enterTestResult(data) {
  return _axios.request({
    url: baseUrl + 'param/UploadTestResults',
    method: 'post',
    data: data
  })
}

export function download(id) {
  return _axios.request({
    url: baseUrl + 'param/download',
    method: 'post',
    responseType: 'blob',
    data: { orderId: id }
  })
}

