import * as yup from 'yup'
/**
 * Schema for confirm password form
 */
export const confirmPasswordSchema = yup.object().shape({
  actualPassword: yup
    .string()
    .required('Actual password field is required')
    .min(8, 'Actual password must be at least 8 characters long')
})
