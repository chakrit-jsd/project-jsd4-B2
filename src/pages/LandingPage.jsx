import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { getLogin, postLogin } from "../services/API/authAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"

const LandingPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [ resMessage, setResMessage ] = useState()
  const onSubmit = async (data) => {
    try {
      const res = await postLogin(data)
      if (res.status === 200) {
        setResMessage(res.data.message)
        setTimeout(() => {
          navigate('/user')
        }, 1000)
      }
    } catch (error) {
      const res = httpErrorCode(error)
      setResMessage(res.message || error)
      console.log(error)
    }

  }

  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await getLogin()
        // console.log(res.status)
      } catch (error) {
        const res = httpErrorCode(error)
        if (res.status !== 200)
        navigate('/user')
      }
    }
    getPage()
  }, [])

  return (
    <>
      <p>{resMessage}</p>
      <form>
        <input type="text" {...register('email')} />
        <input type="text" {...register('password')} />
        <button type="submit" onClick={handleSubmit(onSubmit)}>LOGIN</button>
      </form>
    </>

  )
}

export default LandingPage
