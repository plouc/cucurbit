const { api } = require('cucurbit-server')

api.start({
    cwd: __dirname,
    featuresDir: `${__dirname}/features`,
    cucumberArgs: [
        '--require',
        `${__dirname}/support`,
    ],
})