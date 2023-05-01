import http from './_confingAxios'

const getMe = () => {
  return http.get('/users')
}

const getFeedHome = (userID) => {
  return http.get(`/users/${userID}/feed/gethome`)
}

const getFeedAll = (userID) => {
  return http.get(`/users/${userID}/feed/getall`)
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
