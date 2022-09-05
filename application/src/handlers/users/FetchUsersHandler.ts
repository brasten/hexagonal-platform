import * as API from '@vertabiz/platform-api'
import { iters, ports, UserValue } from '@vertabiz/platform-domain'
import { ElementOf } from 'ts-essentials'
import { FetchUserHandler } from '../../routes/api'

type Dependencies = {
  userRepository: ports.UserRepositoryPort
}

export default function buildHandler({
  userRepository,
}: Dependencies): FetchUserHandler {

  /**
   * Handles HTTP requests for fetching users.
   */
  return async function FetchAllUsersHandler(
    _req,
    res,
  ) {
    const users = await iters.async.toList(
      await userRepository.fetchAll()
    )

    res.status(200).json({ items: users.map(toResponse) })
  }
}

function toResponse(user: UserValue): ElementOf<API.paths['/users']['get']['responses']['200']['content']['application/json']['items']> {
  return {
    id: user.userId,
    kind: 'user',
    email: user.email,
  }
}