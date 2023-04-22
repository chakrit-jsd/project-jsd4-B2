import * as yup from 'yup'
import { provincesThailand } from '../../assets/data/provinceList'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('กรุณากรอก email')
    .min(6, 'email สั้นเกินไป')
    .max(50, 'email ยาวเกินไป')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'not')
    .trim(),

  password: yup
    .string()
    .required('password')
    .min(8, 'short')
    .max(30, 'long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least 1 (A-Z), (a-z), and (0-9)')
    .trim(),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
    .trim(),

  firstname: yup
    .string()
    .required('Please input your Firstname')
    .min(4, 'Firstname 4-20 character')
    .max(20, 'Firstname 4-20 character')
    .matches(/^[a-zA-Z\s]+$/, 'Firstname accept only a-z, A-Z')
    .lowercase()
    .trim(),

  lastname: yup
    .string()
    .required('Please input your Lastname')
    .min(4, 'Lastname 4-20 character')
    .max(20, 'Lastname 4-20 character')
    .matches(/^[a-zA-Z\s]+$/, 'Lastname accept only a-z, A-Z')
    .lowercase()
    .trim(),

  birthdate: yup
    .date()
    .typeError('Please select Birth Date')
    .min(1924, 'Birth invalid')
    .max(new Date(), 'Birth invalid')
    .required('Please select Birth Date'),

  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select gender')
    .required('Please select gender'),

  city: yup
    .string()
    .oneOf(provincesThailand, 'Please select City')
    .required('Please select City')

})

export default schema
