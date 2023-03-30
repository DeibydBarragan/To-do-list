import * as yup from 'yup'
import { auth } from '../../../firebase/firebase'
import { fetchSignInMethodsForEmail } from 'firebase/auth'

export const registerSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password field is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm password field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must be the same'),
  email: yup
    .string()
    .required('Email field is required')
    .email('Email is not valid')
    .test('is-not-registered', 'Email is already registered', async (value) => {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, value)
        return methods.length === 0
      } catch (error) {
        console.error('Error al verificar el correo electrónico:', error)
        return false
      }
    })
})
