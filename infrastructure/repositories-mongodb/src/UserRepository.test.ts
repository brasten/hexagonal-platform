import test from 'ava'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connector } from '.'
import { Schema_V20220827, UserRepository } from './UserRepository'

const XAVIER = { userId: 'user-1', email: 'xavier@example.com' }

const mongod = new MongoMemoryServer()

function buildSubject(): Promise<UserRepository> {
  return connector({ url: mongod.getUri() })
    .then(client => client.db().collection<Schema_V20220827>(`users-${Math.random().toString()}`))
    .then(coll => new UserRepository(coll))
}


test.before(async () => {
  return mongod.start()
})

test('can add users to collection', async t => {
  const subject = await buildSubject()

  t.is(await subject.count(), 0)
  await subject.insertUsers([ XAVIER ])
  t.is(await subject.count(), 1)
})

test('doesUserExist()', async t => {
  const subject = await buildSubject()
  await subject.insertUsers([ XAVIER ])

  t.true(await subject.doesUserExist(XAVIER))
})
