import { _axios, baseUrl } from '@/plugins/axios'

// 根据项目Id获取评论
export function getAllCommentByPrjectId(id) {
  return _axios.request({
    url: baseUrl + 'comment/listByProjectId',
    method: 'post',
    data: { projectId: id, type: '' }
  })
}
