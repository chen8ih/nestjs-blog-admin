/**
 * 文件上传相关
 */
import http from '@/utils/request'

// 二进制，file
// {"success":true,"data":"http://www.dlhtx.top:3000/img/1621745110802-素养打卡-press.png","msg":"上传成功"}
export const uploadImg = () => {
  http.post({
    url: '/file/upImg'
  })
}