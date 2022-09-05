module.exports = {
  files: ['src/**/*.test*'],
  extensions: [ "ts" ],
  require: [
    "ts-node/register",
    "babel-polyfill"
  ],
	ignoredByWatcher: ['{coverage,docs,media,test-types,test-tap}/**'],
  // typescript: {
  //   rewritePaths: {
  //     "src/": "dist/"
  //   },
  //   compile: 'tsc'
  // }
}
