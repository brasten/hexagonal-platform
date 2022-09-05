import { ports, UserValue } from '@vertabiz/platform-domain'
import { InsertableRecord } from '@vertabiz/platform-domain/dist/ports/UserRepository.Port'
import { Collection, WithId } from 'mongodb'

type UserRecord = UserValue & {
  _context?: Record<string, string>
}

export class UserRepository implements ports.UserRepositoryPort {
  collection: Collection<Schema_V20220827>

  constructor(collection: Collection<Schema_V20220827>) {
    this.collection = collection
  }

  async fetchAll(): Promise<AsyncIterable<UserRecord>> {
    return this.collection.find().map(fromDocument)
  }

  async count(): Promise<number> {
    return this.collection.count()
  }

  async doesUserExist(userInfo: { email: string }): Promise<boolean> {
    return await this.collection.findOne({ email: userInfo.email }) !== null
  }

  async insertUsers(records: InsertableRecord[]): Promise<Pick<UserRecord, 'userId' | '_context'>[]> {
    const res = await this.collection.insertMany(records.map(toDocument))

    return records.map((record, idx) => ({
      userId: record.userId,
      _context: {
        _id: res.insertedIds[idx].toHexString(),
      },
    }))
  }
}

export interface Schema_V20220827 {
  userId: string
  email: string
}

function fromDocument(document: WithId<Schema_V20220827>): UserRecord {
  return {
    userId: document.userId,
    email: document.email,
    _context: {
      _id: document._id.toHexString(),
    }
  }
}

function toDocument(record: InsertableRecord): Schema_V20220827 {
  return {
    email: record.email,
    userId: record.userId,
  }
}