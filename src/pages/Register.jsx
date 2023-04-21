import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../utils/validators/validateRegister"
import { Input, Radio, CityList } from "../components/shared/Input"


const Register = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(schema), defaultValues: {gender: 'other'}})
  const onSubmit = (data) => {
    console.log(data)
  }

  const onCancel = (event) => {
    event.preventDefault()
    return navigate('/')
  }

  return (
    <div>
      <h1>Welcome to NestFit</h1>
      <form className="container-form-register">
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
