import http from './_confingAxios'

const getMe = () => {
  return http.get('/users')
}

const getAnother = (userId) => {
  return http.get(`/users/another/${userId}`)
}

const getAnotherFeed = (userId) => {
  return http.get(`/users/another/${userId}/feed`)
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

const postFollows = (data) => {
  return http.post('/users/follows', data)
}

export {
  getMe,
  getAnother,
  getAnotherFeed,
  getFeedHome,
  getFeedAll,
  putProfileEdit,
  postFollows
}
