import * as yup from 'yup'
/**
 * Schema for choose name form
 */
export const chooseNameSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username field is required')
    .min(5, 'Username must be at least 5 characters long')
    .max(15, 'Username must be at most 20 characters long')
})
