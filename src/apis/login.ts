import http from '@/utils/request'

interface loginParams {
  name: string,
  password: string
}

// interface logoutParams {
//   name: string
// }

interface registerParams {
  name: string,
  password: string,
  code: string
}

interface codeParams {
  name: string,
  mail: string
}

/**
 * 登陆
 * @param data
 * @returns
 */
export const Login = (data: loginParams) => {
  return http.post({
    url: '/api/user/login',
    data
  })
}

/**
 * 注册
 * @param data
 * @returns
 */
export const Register = (data: registerParams) => {
  return http.post({
    url: '/api/user/register',
    data
  })
}

/**
 * 获取注册码
 * @param data
 */
export const GetCode = (data: codeParams) => {
  return http.get({
    url: '/api/user/getCode',
    data
  })
}
