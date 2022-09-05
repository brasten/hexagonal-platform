import * as API from '@vertabiz/platform-api'
import { RequestHandler, Router } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { buildBoot } from '../boot'
import buildHandler from '../handlers/users/FetchUsersHandler'

export type FetchUserHandler = RequestHandler<
  ParamsDictionary,
  API.paths['/users']['get']['responses']['200']['content']['application/json']
>

export default async function() {
  const router = Router()

  const boot = await buildBoot()

  router.get('/users', buildHandler(boot.repos))
  console.log(`User Router built.`)

  return router
}

