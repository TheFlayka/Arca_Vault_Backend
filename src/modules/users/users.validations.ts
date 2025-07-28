import * as v from 'valibot'

export const loginSchema = v.object({
  login: v.pipe(
    v.string('Логин неправильного формата'),
    v.minLength(3, 'Минимальная длина логина 3'),
    v.maxLength(20, 'Максимальная длина логина 20')
  ),
  password: v.pipe(
    v.string('Пароль неправильного формата'),
    v.minLength(6, 'Минимальная длина пароля 6'),
    v.maxLength(20, 'Максимальная длина пароля 20')
  ),
})

export const registrationSchema = v.object({
  ...loginSchema.entries,
  name: v.pipe(v.string('Имя неправильного формата'), v.nonEmpty('Имя не может быть пустым')),
  surname: v.optional(v.string('Фамилия неправильного формата')),
})

export const optionalRegistrationSchema = v.partial(registrationSchema)
