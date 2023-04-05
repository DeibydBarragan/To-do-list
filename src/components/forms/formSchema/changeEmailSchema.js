import * as yup from 'yup'
/**
 * Schema for change email form
 */
export const changeEmailSchema = yup.object().shape({
  actualPassword: yup
    .string()
    .required('Actual password field is required')
    .min(8, 'Actual password must be at least 8 characters long'),
  newEmail: yup
    .string()
    .required('Email field is required')
    .email('Email is not valid')
})
