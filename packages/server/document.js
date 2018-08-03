const { inspect } = require('util')
const { Parser } = require('gherkin')
const { loadFeature } = require('./file_system')

const parser = new Parser()

exports.loadGherkinDocument = async featurePath => {
    const raw = await loadFeature(featurePath)

    console.log(raw.toString())

    const doc = parser.parse(raw.toString())

    console.log(inspect(doc, { depth: null, colors: true }))

    return doc
}

exports.getFeatureScenarios = async featurePath => {
    const doc = await exports.loadGherkinDocument(featurePath)

    return doc.feature.children.filter(child => child.type === 'Scenario')
}
