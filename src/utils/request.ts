import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse,  AxiosError, AxiosPromise } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import qs from 'qs'
import router from '@/router'

function networkErrorMessage (e: AxiosError) {
  console.error(e)
  ElMessage({
    type: 'error',
    message: '请求异常, 请稍后再试'
  })
}

const pendingRequest = new Map()

const instance: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
})

const generateReqKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config

  return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
}

// 将当前请求加入pendingRequest
const addPendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config)

  config.cancelToken = 
    config.cancelToken || new Axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

// 检查是否存在重复请求，若存在则取消已发的请求
const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config)

  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
    return config
  }, (error: AxiosError) => {
    console.log(error)
    networkErrorMessage(error)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    removePendingRequest(response.config) // 从pendingRequest对象中移除请求
    return response
  }, (error: AxiosError) => {
    removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
    if (Axios.isCancel(error)) {
      console.log('已取消的重复请求：' + error.message)
    } else {
      ElMessageBox.confirm('发生异常, 请稍后', '错误', {
        confirmButtonText: '重新登录',
        cancelButtonText: '稍后再试',
        type: 'error',
        center: true
      }).then(() => {
        // 重新登录逻辑
        router.push({
          path: '/login',
        })
        sessionStorage.clear()
      }).catch(err => {
        // 退出系统重新登录逻辑
        router.push({
          path: '/login',
        })
        sessionStorage.clear()
      })
    }
  }
)

export interface RequestParams {
  url: string
  data?: unknown
  type?: string
}

export default {
  post ({
    url, 
    data = {},
    type = 'application/json;charset=UTF-8'
  }: RequestParams): AxiosPromise {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        headers: {
          'Content-Type': type,
        },
        url,
        data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get ({
    url,
    data
  }: RequestParams): AxiosPromise {
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params: data
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
