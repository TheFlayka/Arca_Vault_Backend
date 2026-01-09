import * as v from 'valibot'

export const createMoneyboxSchema = v.object({
  name: v.pipe(v.string('Название неправильного формата'), v.nonEmpty('Название не может быть пустым')),
  targetGoal: v.pipe(v.number('Цель неправильного формата'), v.minValue(1, 'Цель должна быть больше 0'))
})