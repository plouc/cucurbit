const EventEmitter = require('events')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const { getTestCasesFromFilesystem, PickleFilter } = require('cucumber')
const { computeFeaturesTree } = require('./tree')

class Registry {
    constructor({ cwd, featuresDir = 'features', supportDir = 'support' }) {
        this.cwd = cwd
        this.featuresDir = featuresDir
        this.supportDir = supportDir
    }

    async load() {
        const featurePaths = await glob(`${this.featuresDir}/**/*.feature`, {
            absolute: true,
            cwd: this.cwd,
        })

        const eventBroadcaster = new EventEmitter()

        this.features = []
        eventBroadcaster.on('gherkin-document', doc => {
            this.features.push(doc)
        })

        this.featureSources = []
        eventBroadcaster.on('source', source => {
            this.featureSources.push(source)
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

        this.tree = computeFeaturesTree(this.features)
    }

    async getTree() {
        if (this.tree !== undefined) {
            return this.tree
        }

        await this.load()

        return this.tree
    }

    async getFeatures() {
        if (this.features === undefined) {
            return this.features
        }

        await this.load()

        return this.features
    }

    async getFeature(uri) {
        if (this.features === undefined) {
            await this.load()
        }

        const feature = this.features.find(feature => feature.uri === uri)
        const source = this.featureSources.find(source => source.uri === uri)

        if (!feature || !source) return null

        return { ...feature, source: source.data }
    }
}

module.exports = Registry
