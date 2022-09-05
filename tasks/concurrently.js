const concurrently = require('concurrently').default
const workspaces = require('../package.json').workspaces
const {argv} = require('process')

const command = argv.at(-1)

concurrently(
  workspaces.map(path => ({
    cwd: `./${path}`,
    name: path.split('/').at(-1),
    command: `yarn run ${command}`,
  }))
)