const EventEmitter = require('events')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const { getTestCasesFromFilesystem, PickleFilter } = require('cucumber')
const { ParameterTypeRegistry } = require('cucumber-expressions')
const { computeFeaturesTree } = require('./tree')
const { getStepDefinitions } = require('./step_definitions')

class Registry {
    constructor({ cwd, cucumberArgs = [], featuresDir = 'features' }, logger) {
        this.cwd = cwd
        this.cucumberArgs = cucumberArgs
        this.featuresDir = featuresDir
        this.logger = logger
    }

    async load() {
        if (this.loader !== undefined) return this.loader

        this.logger.info(`loading features`)

        this.loader = (async () => {
            const stepDefinitions = await getStepDefinitions(this.cwd, this.cucumberArgs)
            this.logger.debug(`${stepDefinitions.length} step definitions found`)

            const featurePaths = await glob(`${this.featuresDir}/**/*.feature`, {
                absolute: true,
                cwd: this.cwd,
            })
            this.logger.debug(`${featurePaths.length} feature files found`)

            const eventBroadcaster = new EventEmitter()

            const features = []
            eventBroadcaster.on('gherkin-document', doc => {
                features.push(doc)
            })

            const featureSources = []
            eventBroadcaster.on('source', source => {
                featureSources.push(source)
            })

            this.pickles = await getTestCasesFromFilesystem({
                cwd: this.cwd,
                featurePaths,
                eventBroadcaster,
                order: 'defined',
                pickleFilter: new PickleFilter({
                    featurePaths,
                }),
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
            this.loader = undefined

            this.logger.info(`successfully loaded features`)
        })()
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
