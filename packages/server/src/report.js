exports.normalizeReport = report => {
    const features = []
    report.forEach(feature => {
        const scenarios = feature.elements.map(scenario => {
            const scenarioReport = {
                name: scenario.name,
                line: scenario.line,
                status: 'undefined',
                steps: scenario.steps.map(step => ({
                    keyword: step.keyword,
                    name: step.name,
                    line: step.line,
                    status: step.result.status,
                })),
            }

            if (scenarioReport.steps.some(s => s.status === 'failed')) {
                scenarioReport.status = 'failed'
            } else if (scenarioReport.steps.every(s => s.status === 'passed')) {
                scenarioReport.status = 'passed'
            }

            return scenarioReport
        })

        let featureStatus = 'undefined'
        if (scenarios.some(s => s.status === 'failed')) {
            featureStatus = 'failed'
        } else if (scenarios.every(s => s.status === 'passed')) {
            featureStatus = 'passed'
        }

        features.push({
            uri: feature.uri,
            status: featureStatus,
            scenarios,
        })
    })

    return features
}
