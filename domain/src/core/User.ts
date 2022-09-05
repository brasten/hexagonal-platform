
export interface UserValue {
  userId: string
  email: string
}

export class User implements UserValue {
  userId: string
  email: string

  constructor(args: {
    userId: string
    email: string
  }) {
    this.userId = args.userId
    this.email = args.email
  }
}