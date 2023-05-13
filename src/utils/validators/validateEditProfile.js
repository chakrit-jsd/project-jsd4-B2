import * as yup from 'yup'
import { provincesThailand } from '../../assets/data/provinceList'

const schema = yup.object().shape({
  profilename: yup
    .string()
    // .min(4, 'Profile name 4-20 character')
    .max(30, 'Profile name 4-20 character')
    .trim(),

  aboutme: yup
    .string()
    .max(200, 'About Me 200 character')
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
    .required('Please select City'),

  interest: yup
    .string()
    .oneOf(['Hiit', 'Pilates', 'Strength', 'Weight', 'Yoga'], 'Please select a valid Activity')
    .required('Please Select Activity')
    .trim(),

  weight: yup
    .number()
    .typeError('Please input weight')
    // .min(10, 'Invalid Weight')
    .max(200, 'Invalid Weight')
    .positive('Invalid Weight'),

  height: yup
    .number()
    .typeError('Please input height')

    .max(250, 'Invalid Height')
    .positive('Invalid Height'),

})

export default schema
