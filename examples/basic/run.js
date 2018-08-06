const { api } = require('cucurbit-server')

api.start({
    cwd: __dirname,
    featurePaths: ['features'],
    requirePaths: ['support'],
    logLevel: 'debug',
})