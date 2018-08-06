'use strict'

const chalk = require('chalk')
const { api } = require('cucurbit-server')

module.exports = {
    name: 'start',
    description: 'starts the server',
    func: opts => {
        return api.start({
            cwd: opts.cwd,
            featuresDir: `${opts.cwd}/features`,
            cucumberArgs: [
                '--require',
                `${opts.cwd}/support`,
            ],
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
        }
    ],
}