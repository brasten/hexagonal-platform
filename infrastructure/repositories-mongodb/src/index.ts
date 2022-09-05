import { MongoClient } from 'mongodb'

export { UserRepository } from './UserRepository'

export interface ConnectorArgs {
  url: string
}

export async function connector({ url }: ConnectorArgs): Promise<MongoClient> {
  return new MongoClient(url).connect()
}
