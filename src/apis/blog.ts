import http from '@/utils/request'

interface IBlogClass {
  title: string,
  className: string,
  page: number,
  row: number,
  userName: string
}
/**
 * 获取博客所有分类信息
 * @returns Array
 */
export const FindBlogClass = () => {
  return http.post({
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