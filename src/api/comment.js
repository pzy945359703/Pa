import { _axios, baseUrl } from '@/plugins/axios'

export function getAllCommentByPrjectId(id) {
  return _axios.request({
    url: baseUrl + 'comment/listByProjectId',
    method: 'post',
    data: { projectId: id, type: '' }
  })
}
