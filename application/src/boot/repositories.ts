import { connector, UserRepository } from '@vertabiz/repositories-mongodb'
import { must } from '../lib/must'

export async function build() {
  const url = must(process.env['DATASTORE_URL']) // TODO: configuration manager
  const db = (await connector({ url })).db()

  return {
    userRepository: new UserRepository(db.collection('users'))
  }
}