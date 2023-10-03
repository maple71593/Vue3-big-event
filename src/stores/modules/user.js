import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserData } from '@/api/user.js'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const userData = ref('')
    const getUserDataApi = async () => {
      const res = await getUserData()
      userData.value = res.data.data
    }

    return {
      token,
      setToken,
      removeToken,
      getUserDataApi,
      userData
    }
  },
  {
    persist: true
  }
)
