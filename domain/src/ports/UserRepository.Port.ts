import { core } from '..'
import { UserValue } from '../core'
import { UUIDProviderBaseImpl } from '../core/UUIDProvider'
import { fromList } from '../lib/iters/async'

export type UniqueAttributes = Pick<UserValue, 'email'>
export type InsertableRecord = UserValue

/**
 * UserRepository handles storage / query duties for `User` records.
 */
export interface UserRepositoryPort {
  doesUserExist(record: UniqueAttributes): Promise<boolean>

  insertUsers(records: InsertableRecord[]): Promise<Pick<UserValue, 'userId'>[]>

  fetchAll(): Promise<AsyncIterable<core.UserValue>>
}

/**
 * Reference implementation
 */
export class InMemoryUserRepository implements UserRepositoryPort {

  users = [] as UserValue[]

  clear() {
    this.users.length = 0
  }

  #resetTo(values: UserValue[]) {
    this.clear()
    this.users.push(...values)
  }

  // Port Implementation //

  async insertUsers(
    records: InsertableRecord[]
  ) {
    const backupUserList = [...this.users]

    const results = [] as Pick<UserValue, 'userId'>[]

    for (const record of records) {
      if (await this.doesUserExist(record)) {
        this.#resetTo(backupUserList)
        throw new Error("...")
      }

      const id = await new UUIDProviderBaseImpl().get()
      this.users.push({...record, userId: id})
      results.push({ userId: id })
    }

    return results
  }

  async doesUserExist(
    userInfo: { email: string },
  ): Promise<boolean> {
    return this.users.find(user => user.email === userInfo.email) !== undefined
  }

  async fetchAll(): Promise<AsyncIterable<core.UserValue>> {
    return fromList(this.users)
  }
}
