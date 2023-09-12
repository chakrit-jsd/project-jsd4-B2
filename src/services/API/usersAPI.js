import http from './_confingAxios'

const getMe = () => {
  return http.get('/users')
}

const getUserById = (userId) => {
  return http.get(`users/info/${userId}`)
}

const getAnother = (userId) => {
  return http.get(`/users/another/${userId}`)
}

const getAnotherFeed = (userId, page) => {
  return http.get(`/users/another/${userId}/feed/${page || 1}`)
}

const getFeedHome = (page) => {
  return http.get(`/users/feed/gethome/${page || 1}`)
}

const getFeedAll = (page) => {
  return http.get(`/users/feed/getall/${page || 1}`)
}

const putProfileEdit = (data) => {
  return http.put(`/users/profile/edit`, data)
}

const postFollows = (data) => {
  return http.post('/users/follows', data)
}

const getSearchUsers = (text) => {
  return http.get(`/search?text=${text}`)
}

const getDashboard = (userId) => {
  return http.get(`/users/dashboard/${userId}`)
}


export {
  getMe,
  getUserById,
  getAnother,
  getAnotherFeed,
  getFeedHome,
  getFeedAll,
  putProfileEdit,
  postFollows,
  getSearchUsers,
  getDashboard
}
