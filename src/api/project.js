import { _axios, baseUrl } from '@/plugins/axios'

export function getAllPorject() {
  return _axios.request({
    url: baseUrl + 'project/listAll',
    method: 'post',
    data: {}
  })
}

export function getAllPorjectType() {
  return _axios.request({
    url: baseUrl + 'project/listProjectType',
    method: 'post',
    data: {}
  })
}

export function getPorjectsByType(param) {
  return _axios.request({
    url: baseUrl + 'project/listByType',
    method: 'post',
    data: param
  })
}

export function getPorjectsByName(projectName) {
  return _axios.request({
    url: baseUrl + 'project/searchByName',
    method: 'post',
    data: { name: projectName, type: '' }
  })
}

export function getPorjectInfo(param) {
  return _axios.request({
    url: baseUrl + 'project/info',
    method: 'post',
    data: param
  })
}
