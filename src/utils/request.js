import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '../router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基礎地址，超時時間
  baseURL,
  timeout: 3000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 攜帶token
    //調用已經封裝好的token模塊
    const useStore = useUserStore()
    if (useStore.token) {
      // 請求頭字段
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 處理業務失敗
    if (res.data.code === 0) {
      return res
    }
    // TODO 4. 摘取核心回應資料
    ElMessage.error(res.data.message || '服務異常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 處理401錯誤
    if (err.response?.status === 401) router.push('/login')
    // 錯誤的默認情況
    ElMessage.error(err.response.data.message || '服務異常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
