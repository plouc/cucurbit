const express = require('express')
const cors = require('cors')
const { createLogger, format, transports } = require('winston')
const Registry = require('./registry')
const { runCli } = require('./wrap_cli')

exports.start = async ({
    cwd = process.cwd(),
    port = 5000,
    featurePaths = ['features'],
    requirePaths = [],
    cucumberArgs = [],
    logLevel = 'info',
}) => {
    const logger = createLogger({
        level: logLevel,
        format: format.combine(format.colorize(), format.splat(), format.simple()),
        transports: [new transports.Console()],
    })

    const registry = new Registry({
        cwd,
        featurePaths,
        requirePaths,
        cucumberArgs,
        logger,
    })
    await registry.load()

    const app = express()

    app.use(cors())

    app.use(express.static(`${__dirname}/../ui`))

    app.get('/api/features', async (req, res) => {
        const tree = await registry.getTree()

        res.status(200).send(tree)
    })

    app.get('/api/step_definitions', async (req, res) => {
        const stepDefinitions = await registry.getStepDefinitions()

        res.status(200).send(
            stepDefinitions.map(def => ({
                line: def.line,
                pattern: def.pattern.toString(),
                uri: def.uri,
            }))
        )
    })

    app.get('/api/features/:uri', async (req, res) => {
        const { uri } = req.params
        try {
            const feature = await registry.getFeature(uri)

            if (feature === null) {
                return res.status(404).send({
                    message: `no feature found for uri: ${uri}`,
                })
            }

            res.status(200).send(feature)
        } catch (err) {
            res.status(500).send({
                message: `an unexpected error occurred while loading feature: ${uri}.\n${
                    err.message
                }`,
            })
        }
    })

    app.post('/api/run', async (req, res) => {
        const output = await runCli({
            cli: registry.getCliInstance(),
            logger,
        })

        res.status(200).send(output)
    })

    app.listen(port, () => {
        logger.info(`[server] cucurbit-server listening on port ${port}!`)
    })
}
