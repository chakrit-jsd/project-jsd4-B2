import http from './_confingAxios'

const postCreateCard = (data) => {
  return http.post('/cards/create', data)
}

const putEditCard = (data) => {
  return http.put('/cards/edit', data)
}

const deleteCard = (cardId) => {
  return http.delete(`cards/delete/${cardId}`)
}

const postLikedCard = (cardId) => {
  return http.post('/cards/liked', { cardId: cardId })
}

export  {
  postCreateCard,
  putEditCard,
  deleteCard,
  postLikedCard
}
