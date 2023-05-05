import http from './_confingAxios'

const getMe = () => {
  return http.get('/users')
}

const getFeedHome = () => {
  return http.get(`/users/feed/gethome`)
}

const getFeedAll = () => {
  return http.get(`/users/feed/getall`)
}

const putProfileEdit = (data) => {
  return http.put(`/users/profile/edit`, data)
}


export {
  getMe,
  getFeedHome,
  getFeedAll,
  putProfileEdit
}
