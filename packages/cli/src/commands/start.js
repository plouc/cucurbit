'use strict'

const openBrowser = require('react-dev-utils/openBrowser')
const { api } = require('cucurbit-server')

const collect = (val, memo) => {
    memo.push(val)
    return memo
}

module.exports = {
    name: 'start',
    description: 'starts the server',
    func: opts => {
        return api
            .start({
                cwd: opts.cwd,
                port: opts.port,
                featurePaths: opts.features.length > 0 ? opts.features : ['features'],
                requirePaths: opts.require,
                cucumberArgs: [],
                logLevel: opts.logLevel,
            })
            .then(() => {
                if (opts.open === true) {
                    openBrowser(`http://localhost:${opts.port}`)
                }
            })
    },
    options: [
        {
            command: '--port [number]',
            default: process.env.PORT || 5000,
            parse: v => Number(v),
        },
        {
            command: '--cwd [string]',
            default: process.cwd(),
        },
        {
            command: '--features <string>',
            default: [],
            parse: collect,
        },
        {
            command: '--require <string>',
            default: [],
            parse: collect,
        },
        {
            command: '--no-open',
            default: false,
        },
        {
            command: '--log-level <string>',
            description: `must be one of: 'debug', 'info', 'warn', 'error'`,
            default: 'info',
        },
    ],
}
