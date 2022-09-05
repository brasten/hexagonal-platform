import { build as buildRepositories } from './repositories'

export async function buildBoot() {
  return {
    repos: await buildRepositories()
  }
}