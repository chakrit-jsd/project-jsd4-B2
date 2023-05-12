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

const getLogout = () => {
  return http.get('/logout')
}

export {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout
}
