import test from 'ava'
import { fx } from '../../..'
import { InMemoryUserRepository } from '../../../ports/UserRepository.Port'
import SignUpUseCase from './SignUp.UseCase'

const USER = fx.user()

test('with valid user info - adds user to system', async t => {
  const userRepository = new InMemoryUserRepository()
  const useCase = new SignUpUseCase({ userRepository })

  const result = await useCase.doSignUp({ email: USER.email })

  t.deepEqual(result.status, 'ok')
  t.true(await userRepository.doesUserExist(USER)) // <- we need to assert something against a store of some kind
})

test('with existing user info - fails', async t => {
  const userRepository = new InMemoryUserRepository()
  await userRepository.insertUsers([ USER ])

  const useCase = new SignUpUseCase({ userRepository })

  const result = await useCase.doSignUp({ email: USER.email })

  t.deepEqual(result.status, 'fail')
})