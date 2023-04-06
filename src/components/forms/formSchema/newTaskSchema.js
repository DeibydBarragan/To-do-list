import * as yup from 'yup'
/**
 * Schema for new task form
 */
export const newTaskSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name field is required'),
  description: yup
    .string()
})
