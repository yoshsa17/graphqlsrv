import * as yup from 'yup'

const username = yup
  .string()
  .min(5, 'username must be more than 5 chars')
  .max(20, 'username must be less than 20 chars')
  .required('userName is required')

const password = yup
  .string()
  .min(8, 'password must be more than 8 chars')
  .max(32, 'password must be less than 32 chars')
  .matches(
    /^(.*[a-z].*)$/,
    'Password must contains at least 1 lowercase latter'
  )
  .matches(
    /^(.*[A-Z].*)$/,
    'Password must contains at least 1 uppercase latter'
  )
  .matches(/^(.*\d.*)$/, 'Password must contains at least 1 number')
  .required('password is required')

const email = yup
  .string()
  .email('email must be a valid email')
  .required('email is required')

export const signUpRules = yup.object().shape({
  username,
  email,
  password,
})

export const loginRules = yup.object().shape({
  email,
  password,
})
