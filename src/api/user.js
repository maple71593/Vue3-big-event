import request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

export const getUserData = () => {
  return request.get('/my/userinfo')
}

// 修改用戶資訊
export const ChnageMyUserInfo = (data) => {
  return request.put('/my/userinfo', data)
}
//修改用戶頭像
export const ChangeMyUpdateAvatar = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
//修改密碼
export const ChangeMyUpdatepwd = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
