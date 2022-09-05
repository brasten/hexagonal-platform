import Chance from 'chance'
import { v1 } from 'uuid'
import { UserValue } from '../../core'

export function uuid(): string {
  return v1()
}

export function user(): UserValue {
  return {
    userId: uuid(),
    email: Chance().email(),
  }
}