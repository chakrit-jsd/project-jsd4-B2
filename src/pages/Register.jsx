import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../utils/validators"
import * as yup from 'yup'


const Input = ({ label, field, register, errors, placeholder, type, id }) => (
  <>
    <label>
      <p>{label}</p>
      <span><ErrorMessage errors={errors} name={field} /></span>
      <input {...register(field)} placeholder={placeholder} type={type} />
    </label>
  </>
)

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur', resolver: yupResolver(schema)})
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div>
      <h1>Welcome to NestFit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label='Email' field='email' register={register} errors={errors} placeholder='email' type='text' />
        <Input label='Password' field='password' register={register} errors={errors} placeholder='password' type='password' />
        <Input label='Confirm password' field='passwordConfirm' register={register} errors={errors} placeholder='confirm password' type='password' />
        {/* <Input label='First Name' field='firstname' register={register} required='required' errors={errors} placeholder='firstname' type='text' />
        <Input label='Last Name' field='lastname' register={register} required='required' errors={errors} placeholder='lastname' type='text' />
        <Input label='Birth Date' field='birthdate' register={register} required='required' errors={errors} placeholder='birthdate' type='date' /> */}
        <button>Sign up</button>
      </form>
    </div>
  )
}

export default Register
