import { UserRepositoryPort } from '../../../ports/UserRepository.Port'

export class SignUpUseCase {
  #userRepository: UserRepositoryPort

  async doSignUp(userInfo: UserArgs): Promise<SignUpResult> {
    const alreadyExists = await this.#userRepository.doesUserExist(userInfo)

    if (alreadyExists) {
      return { status: 'fail' }
    }

    await this.#userRepository.insertUsers([
      { email: userInfo.email },
    ])

    return { status: 'ok' }
  }

  constructor(deps: {
    userRepository: UserRepositoryPort
  }) {
    this.#userRepository = deps.userRepository
  }
}

export default SignUpUseCase

export interface SignUpResult {
  status: 'ok' | 'fail'
}

export interface UserArgs {
  email: string
}
