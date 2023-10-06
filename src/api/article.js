import request from '@/utils/request.js'

//拿到List參數
export const getListData = () => {
  return request.get('/my/cate/list')
}
// 新增list參數
export const AddListData = (data) => {
  return request.post('/my/cate/add', data)
}
//修改list參數
export const ChangeListData = (data) => {
  return request.put('/my/cate/info', data)
}
// 刪除List 參數
export const delList = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
//獲取文章列表
export const getArticleList = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
//發布文章
export const PostArticleAdd = (data) => {
  return request.post('/my/article/add', data)
}
//獲取文章詳情
export const GetArticleInfo = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}
//更新文章詳情
export const PutSrticleInfo = (data) => {
  return request.put('/my/article/info', data)
}
//刪除編輯文章
export const DelArticleInfo = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id
    }
  })
}
