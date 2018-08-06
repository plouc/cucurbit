const express = require('express')
const cors = require('cors')
const { createLogger, format, transports } = require('winston')
const Registry = require('./registry')
const { run } = require('./wrap_cli')

exports.start = async options => {
    const logger = createLogger({
        level: 'debug',
        format: format.combine(
            format.colorize(),
            format.splat(),
            format.simple(),
        ),
        transports: [
            new transports.Console(),
        ]
    })

    logger.info('starting cucurbit server', options)


    const app = express()

    const registry = new Registry(options, logger)
    await registry.load()

    app.use(cors())

    app.use(express.static(`${__dirname}/../ui`))

    app.get('/features', async (req, res) => {
        const tree = await registry.getTree()

        res.status(200).send(tree)
    })

    app.get('/step_definitions', async (req, res) => {
        const stepDefinitions = await registry.getStepDefinitions()

        res.status(200).send(
            stepDefinitions.map(def => ({
                line: def.line,
                pattern: def.pattern.toString(),
                uri: def.uri,
            }))
        )
    })

    app.get('/features/:uri', async (req, res) => {
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

    app.post('/run', async (req, res) => {
        logger.info('running tests')
        const output = await run(logger, options.cwd, [...options.cucumberArgs, options.featuresDir])
        logger.info('tests finished')

        res.status(200).send(output)
    })

    app.listen(5000, () => {
        logger.info('Example app listening on port 5000!')
    })
}
