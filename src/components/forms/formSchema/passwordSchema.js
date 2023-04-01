import * as yup from 'yup'

export const passwordSchema = yup.object().shape({
  actualPassword: yup
    .string()
    .required('Actual password field is required')
    .min(8, 'Actual password must be at least 8 characters long'),
  newPassword: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmNewPassword: yup
    .string()
    .required('Confirm password field is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must be the same')
})
