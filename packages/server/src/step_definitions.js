const { Writable } = require('stream')
const { Cli } = require('cucumber')

exports.getStepDefinitions = async (cwd, args = []) => {
    const cli = new Cli({
        argv: [...process.argv, '-f', 'json', ...args],
        cwd,
        stdout: new Writable({}),
    })

    const config = await cli.getConfiguration()
    config.supportCodePaths.forEach(p => {
        delete require.cache[p]
    })
    config.supportCodeRequiredModules.forEach(p => {
        delete require.cache[p]
    })

    const { stepDefinitions } = cli.getSupportCodeLibrary(config)

    return stepDefinitions
}
