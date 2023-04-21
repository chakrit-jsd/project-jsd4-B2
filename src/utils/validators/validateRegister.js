import * as yup from 'yup'


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

})

export default schema
