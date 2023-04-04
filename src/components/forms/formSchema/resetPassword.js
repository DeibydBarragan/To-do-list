import * as yup from 'yup'

export const resetEmail = yup.object().shape({
  email: yup
    .string()
    .required('Email field is required')
    .email('Email is not valid')
})
