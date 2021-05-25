import http from '@/utils/request'

export interface IClassName {
  className: string
}

interface IBlogClass {
  title: string,
  className: string,
  page: number,
  row: number,
  userName: string
}

interface IBlog {
  bgImg: string,
  body: string,
  className: string,
  isTop: string,
  name: string,
  showIndex: string,
  title: string,
  upFileUrl: string
}
/**
 * 增加分类信息
 * @param data 
 * @returns 
 */
export const AddBlogClass = (data: IClassName) => {
  return http.post({
    url: '/api/blog/addBlogClass',
    data
  })
}

/**
 * 删除分类信息
 * @param data 
 * @returns 
 */
export const DeleteBlogClass = (data: IClassName) => {
  return http.delete({
    url: '/api/blog/deleteBlogClass',
    data
  })
}
/**
 * 获取博客所有分类信息
 * @returns Array
 */
export const FindBlogClass = () => {
  return http.get({
    url: '/api/blog/findBlogClass'
  })
}

/**
 * 根据用户名查询博客列表
 * @param data 
 * @returns 
 */
export const FindBlogByUsernameHasPage = (data: IBlogClass) => {
  return http.get({
    url: '/api/blog/findBlogByUsernameHasPage',
    data
  })
}

/**
 * 新增博客
 * @param data 
 * @returns 
 */
export const addBlog = (data: IBlog) => {
  return http.post({
    url: '/api/blog/addBlog',
    data
  })
}