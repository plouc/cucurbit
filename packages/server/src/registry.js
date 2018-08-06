const EventEmitter = require('events')
const { getTestCasesFromFilesystem, PickleFilter } = require('cucumber')
const { ParameterTypeRegistry } = require('cucumber-expressions')
const { computeFeaturesTree } = require('./tree')
const { getStepDefinitions } = require('./step_definitions')
const { getCli } = require('./wrap_cli')

class Registry {
    constructor({ cwd, featurePaths, requirePaths, cucumberArgs, logger }) {
        logger.debug('[registry] initializing registry')
        logger.debug(`[registry] cwd '%s'`, cwd)
        logger.debug(`[registry] featurePaths '%s'`, featurePaths.join(`', '`))
        logger.debug(`[registry] requirePaths '%s'`, requirePaths.join(`', '`))
        logger.debug(
            `[registry] cucumberArgs %s`,
            cucumberArgs.length > 0 ? cucumberArgs.join(', ') : '<none>'
        )

        this.cwd = cwd
        this.featurePaths = featurePaths
        this.requirePaths = requirePaths
        this.logger = logger
    }

    getCliInstance() {
        return getCli({
            cwd: this.cwd,
            featurePaths: this.featurePaths,
            requirePaths: this.requirePaths,
            logger: this.logger,
        })
    }

    async load() {
        this.logger.debug(`[registry] loading features`)

        const cli = this.getCliInstance()

        const config = await cli.getConfiguration()

        const stepDefinitions = await getStepDefinitions({
            cli,
            config,
            logger: this.logger,
        })

        this.logger.debug(`[registry] found ${config.featurePaths.length} matching feature files`)

        const features = []
        const featureSources = []

        const eventBroadcaster = new EventEmitter()
        eventBroadcaster.on('gherkin-document', doc => {
            features.push(doc)
        })
        eventBroadcaster.on('source', source => {
            featureSources.push(source)
        })

        this.pickles = await getTestCasesFromFilesystem({
            cwd: this.cwd,
            featurePaths: config.featurePaths,
            eventBroadcaster,
            order: config.order,
            pickleFilter: new PickleFilter(config.pickleFilterOptions),
        })

        this.stepDefinitions = stepDefinitions
        this.features = features
        this.featureSources = featureSources
        this.tree = computeFeaturesTree(this.features)

        const parameterTypeRegistry = new ParameterTypeRegistry()
        this.features.forEach(feature => {
            feature.document.feature.children.forEach(scenario => {
                scenario.steps.forEach(step => {
                    const defs = stepDefinitions.filter(stepDefinition =>
                        stepDefinition.matchesStepName({
                            stepName: step.text,
                            parameterTypeRegistry,
                        })
                    )

                    if (defs.length === 1) {
                        const def = defs[0]
                        const params = def.getInvocationParameters({
                            step: { ...step, arguments: [] },
                            parameterTypeRegistry,
                            world: {},
                        })
                        step.definition = {
                            pattern: def.pattern.toString(),
                            params,
                        }
                    }
                })
            })
        })

        eventBroadcaster.removeAllListeners()

        this.logger.info(`[registry] found ${features.length} features`)
    }

    async getOrLoad(key) {
        if (this[key] !== undefined) return this[key]

        await this.load()

        return this[key]
    }

    async getStepDefinitions() {
        return this.getOrLoad('stepDefinitions')
    }

    async getTree() {
        return this.getOrLoad('tree')
    }

    async getFeatures() {
        return this.getOrLoad('features')
    }

    async getFeature(uri) {
        await this.getFeatures()

        const feature = this.features.find(feature => feature.uri === uri)
        const source = this.featureSources.find(source => source.uri === uri)

        if (!feature || !source) return null

        return { ...feature, source: source.data }
    }
}

module.exports = Registry
