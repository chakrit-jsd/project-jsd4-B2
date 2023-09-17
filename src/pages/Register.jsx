import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../utils/validators/validateRegister"
import { Input, Radio, CityList } from "../components/shared/Input"
import { postRegister, getRegister } from "../services/API/authAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import HelmetTitle from "../components/shared/Helmet"
import '../assets/styles/register.css'

const Register = () => {
  const [ resMessage, setResMessage] = useState('')

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(schema), defaultValues: {gender: 'other'}})
  const onSubmit = async (data) => {
    try {
      const res = await postRegister(data)
      console.log(data)
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
          navigate('/me')
        }
      }
    }
    getPage()
  }, [])

  return (
    <div className="container-main-register">
      <HelmetTitle title='Register | Nest-Fit by JSD#4 B2'/>
      <header className="nav-register">
        <div>
          <Link to='/'><img src="static/img/Nest-fit-logo.png" alt="Logo-Nest-Fit" style={{ width: 100}}/></Link>
        </div>
        <Link to='/' className="nav-link-login">Log in</Link>
      </header>
      <main className="container-register">
        <h1>Welcome to, <span className="nest">Nest</span><span className="fit">Fit</span></h1>
        <form className="container-form-register">
          <p>{resMessage}</p>
          <Input label='Email' field='email' register={register} errors={errors}  type='text' />
          <Input label='Password' field='password' register={register} errors={errors}  type='password' />
          <Input label='Confirm password' field='passwordConfirm' register={register} errors={errors}  type='password' />
          <Input label='First Name' field='firstname' register={register}  errors={errors} p type='text' />
          <Input label='Last Name' field='lastname' register={register} errors={errors}  type='text' />
          <Input label='Birth Date' field='birthdate' register={register} errors={errors} type='date' />
          <Radio register={register} errors={errors} />
          <CityList register={register} errors={errors} />
          <div className="container-btn-register">
            <button className="cancel-register" onClick={onCancel} type="button">Cancel</button>
            <button className="submit-register" onClick={handleSubmit(onSubmit)} type="submit">Sign up</button>
          </div>
        </form>
      </main>

    </div>
  )
}

export default Register
