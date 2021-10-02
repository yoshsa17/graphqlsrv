import * as yup from 'yup'

const title = yup
  .string()
  .min(3, 'title must be more than 5 chars')
  .max(20, 'title must be less than 20 chars')
  .required('post title is required')

const text = yup
  .string()
  .min(3, 'password must be more than 8 chars')
  .max(50, 'password must be less than 32 chars')
  .required('post text is required')

export const postRules = yup.object().shape({
  title,
  text,
})
