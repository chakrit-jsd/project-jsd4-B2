import http from './_confingAxios'

const getFeedHome = (userID) => {
  return http.get(`/users/${userID}/feed/gethome`)
}

const getFeedAll = (userID) => {
  return http.get(`/users/${userID}/feed/getall`)
}

const patchProfileEdit = (userID, data) => {
  return http.patch(`/users/${userID}/profile/edit`, data)
}


export {
  getFeedHome,
  getFeedAll,
  patchProfileEdit
}
