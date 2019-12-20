import {request} from '@/utils/request'

// 添加一级分类
export function addFirstCategory(data){
  return request({
    method: "post",
    url:"/news/addFirstCategory/",
    data,
  })
}

// 获取分类数据
export function getCategory(data){
  return request({
    method: "post",
    url:"/news/getCategory/",
    data,
  })
}

// 删除一级分类
export function deleteCategory(data){
  return request({
    method: "post",
    url:"/news/deleteCategory/",
    data,
  })
}

// 编辑一级分类
export function editCategory(data){
  return request({
    method: "post",
    url:"/news/editCategory/",
    data,
  })
}