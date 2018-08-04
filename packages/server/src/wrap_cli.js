const { Writable } = require('stream')
const { Cli } = require('cucumber')
const { normalizeReport } = require('./report')

exports.run = async (cwd, args = []) => {
    let output = ''
    const outStream = new Writable({
        write(chunk, encoding, callback) {
            output += chunk.toString()
            callback()
        },
    })

    const cli = new Cli({
        argv: [...process.argv, '-f', 'json', ...args],
        cwd,
        stdout: outStream,
    })

    const config = await cli.getConfiguration()
    config.supportCodePaths.forEach(p => {
        delete require.cache[p]
    })
    config.supportCodeRequiredModules.forEach(p => {
        delete require.cache[p]
    })

    await cli.run()

    const report = JSON.parse(output)

    return normalizeReport(report)
}
