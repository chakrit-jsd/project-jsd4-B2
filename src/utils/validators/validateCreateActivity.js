import * as yup from 'yup'


const schema = yup.object().shape({
  title: yup
    .string()
    .required('Please Input Title')
    .max(50, 'Title Is longer Max 50 character')
    .trim(),

  description: yup
    .string()
    .required('Please Say Something')
    .max(200, 'Description Is longer Max 200 character')
    .trim(),

  activity: yup
    .string()
    .oneOf(['Hiit', 'Pilates', 'Strength', 'Weight', 'Yoga'], 'Please select a valid Activity')
    .required('Please Select Activity')
    .trim(),

  duration: yup
    .number()
    .positive('Please Select Valid Number')
    .required('Please Select Duration')
    .min(10, 'Duration 10 - 180 minute')
    .max(180, 'Duration 10 - 180 minute'),

  dateactivity: yup
    .date()
    .typeError('Please select Date Activity')
    .min(1924, 'Date invalid')
    .max(new Date(), 'Date invalid')
    .required('Please select Date'),
})

export default schema
