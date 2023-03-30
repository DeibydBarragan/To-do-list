import * as yup from 'yup'

export const chooseNameSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username field is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(15, 'Username must be at most 20 characters long')
})
