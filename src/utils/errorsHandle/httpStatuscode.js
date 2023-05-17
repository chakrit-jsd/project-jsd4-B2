
export const httpErrorCode = (error) => {
  const res = error.response
  if (res) {
    return {
      message: res.data.message,
      status: res.status
    }
  }
  return console.log(error)
}
