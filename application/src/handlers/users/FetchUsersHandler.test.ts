import { fx, InMemoryUserRepository } from '@vertabiz/platform-domain'
import test from 'ava'
import httpMocks from 'node-mocks-http'
import buildHandler from './FetchUsersHandler'

const USERS = [ fx.user(), fx.user() ]

test('returns user items', async t => {
  const userRepository = new InMemoryUserRepository()
  const insertResults = await userRepository.insertUsers(USERS)

  const handler = buildHandler({ userRepository })

  const {req, res} = httpMocks.createMocks()

  await handler(req, res, () => {})

  const body = res._getJSONData()

  t.deepEqual(body, { items: [
    {
      id: insertResults[0].userId,
      kind: 'user',
      email: USERS[0].email,
    },
    {
      id: insertResults[1].userId,
      kind: 'user',
      email: USERS[1].email,
    }
  ] })
})