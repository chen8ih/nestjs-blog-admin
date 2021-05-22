import http from '@/utils/request'

interface loginParams {
  username: string,
  password: string
}
interface logoutParams {
  username: string
}

export const Login = (data: loginParams) => {
  return http.post({
    url: '/user/login',
    data
  })
}
