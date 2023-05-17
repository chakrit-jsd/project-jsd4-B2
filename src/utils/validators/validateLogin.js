import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please input your Email')
    .min(6, 'Email must 6 - 50 character')
    .max(50, 'Email must 6 - 50 character')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid Email Pattern')
    .trim(),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must 8 - 30 character')
    .max(30, 'Password must 8 - 30 character')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least 1 (A-Z), (a-z), and (0-9)')
    .trim(),
})

export default schema
