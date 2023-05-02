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

export {
  getRegister,
  postRegister,
  getLogin,
  postLogin
}
