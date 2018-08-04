const { api } = require('cucurbit-server')

api.start({
    cwd: __dirname,
    cucumberArgs: [
        '--require',
        `${__dirname}/support`,
        `${__dirname}/features`,
    ],
})