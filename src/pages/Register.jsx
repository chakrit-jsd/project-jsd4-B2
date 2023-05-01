import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../utils/validators/validateRegister"
import { Input, Radio, CityList } from "../components/shared/Input"
import { postRegister, getRegister } from "../services/API/authAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"


const Register = () => {
  const [ resMessage, setResMessage] = useState('')

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(schema), defaultValues: {gender: 'other'}})
  const onSubmit = async (data) => {
    try {
      const res = await postRegister(JSON.stringify(data))
      // if (res.status !== 201) return setResMessage('sdfsdf')
      setResMessage(res.data.message)
      return navigate('/')
    } catch (error) {
      console.log(error)
      const res = httpErrorCode(error)
      setResMessage(res.message || error)
    }
   }

  const onCancel = (event) => {
    event.preventDefault()
    return navigate('/')
  }

  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await getRegister()

      } catch (error) {
        const res = httpErrorCode(error)
        if (res.status !== 200) {
          navigate('/users')
        }
      }
    }
    getPage()
  }, [])

  return (
    <div>
      <h1>Welcome to NestFit</h1>
      <form className="container-form-register">
        <p>{resMessage}</p>
        <Input label='Email' field='email' register={register} errors={errors} placeholder='email' type='text' />
        <Input label='Password' field='password' register={register} errors={errors} placeholder='password' type='password' />
        <Input label='Confirm password' field='passwordConfirm' register={register} errors={errors} placeholder='confirm password' type='password' />
        <Input label='First Name' field='firstname' register={register}  errors={errors} placeholder='firstname' type='text' />
        <Input label='Last Name' field='lastname' register={register} errors={errors} placeholder='lastname' type='text' />
        <Input label='Birth Date' field='birthdate' register={register} errors={errors} placeholder='birthdate' type='date' />
        <Radio register={register} errors={errors} />
        <CityList register={register} errors={errors} />
        <button onClick={onCancel} type="button">Cancel</button>
        <button onClick={handleSubmit(onSubmit)} type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Register
