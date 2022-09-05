import { v4 } from 'uuid'

export interface UUIDProvider {
  get(): Promise<string>
}

export class UUIDProviderBaseImpl implements UUIDProvider {
  async get(): Promise<string> {
    return v4()
  }
}