import Request from '@/utils/request.js'

export const userRegisterService = ({ username, password, repassword }) => {
  return Request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

export const userLoginService = ({ username, password }) => {
  return Request.post('/api/login', { username, password })
}
