import http from './_confingAxios'

const postCreateCard = (data) => {
  return http.post('/cards/create', data)
}

const putEditCard = (data) => {
  return http.put('/cards/edit', data)
}

const deleteCard = (id) => {
  return http.delete(`cards/delete/${id}`)
}

export  {
  postCreateCard,
  putEditCard,
  deleteCard
}
