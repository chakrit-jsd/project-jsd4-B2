import http from './_confingAxios'

const getRegister = () => {
  return http.get('/register')
}

const postRegister = (data) => {
  return http.post('/register', data)
}


const getLogin = () => {
  return http.get('/login')
}

const postLogin = (data) => {
  return http.post('/login', data)
}

const getSlackLogin = () => {
  // http.interceptors.response.use( async (res) => {
  //   console.log('res slack 1')
  //   const data = await res
  //   console.log(data)
  //   return res
  // })
  return http.get('/login/slack')
}

const getLogout = () => {
  return http.get('/logout')
}

export {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getSlackLogin,
  getLogout
}
