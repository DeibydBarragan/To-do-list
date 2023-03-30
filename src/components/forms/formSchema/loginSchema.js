import { fetchSignInMethodsForEmail } from 'firebase/auth'
import * as yup from 'yup'
import { auth } from '../../../firebase/firebase'

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters long')
    .when('$password', (checkPassword, schema) => {
      return checkPassword
        ? schema.test('validate-password', 'Email or password is not correct', async (value) => {
          try {
            const methods = await fetchSignInMethodsForEmail(auth, value)
            return methods.length === 0
          } catch (error) {
            return false
          }
        })
        : schema
    }),
  email: yup
    .string()
    .required('Email field is required')
    .email('Email is not valid')
})
