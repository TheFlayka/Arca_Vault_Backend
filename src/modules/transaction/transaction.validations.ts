import * as v from 'valibot'

enum TransactionOperator {
  inc = 'inc',
  dec = 'dec'
}

export const createTransactionSchema = v.object({
  name: v.pipe(
    v.string('Название транзакции неправильного формата'),
    v.nonEmpty('Название транзакции не может быть пустым'),
    v.minLength(3, 'Минимальная длина названия транзакции 3'),
    v.maxLength(20, 'Максимальная длина названия транзакции 20')
  ),
  amount: v.pipe(
    v.number('Сумма транзакции неправильного формата'),
    v.minValue(0.01, 'Минимальная сумма транзакции 0.01'),
    v.maxValue(1000000, 'Максимальная сумма транзакции 1000000')
  ),
  moneyboxId: v.string('ID копилки неправильного формата'),
  operator: v.enum(TransactionOperator, 'Оператор транзакции неправильного формата')
})
