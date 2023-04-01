import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters long'),
  email: yup
    .string()
    .required('Email field is required')
    .email('Email is not valid')
})
