const { Writable } = require('stream')
const { Cli } = require('cucumber')
const { normalizeReport } = require('./report')

exports.getCli = ({ cwd, featurePaths, requirePaths, logger }) => {
    const args = ['-f', 'json']
    requirePaths.forEach(p => {
        args.push('--require', p)
    })
    featurePaths.forEach(p => {
        args.push(p)
    })

    logger.debug(`[get_cli] cucumber args: %s`, args.join(' '))

    const cli = new Cli({
        argv: [...process.argv, ...args],
        cwd,
        stdout: new Writable({}),
    })

    return cli
}

exports.runCli = async ({ cli, logger }) => {
    logger.info(`[run_cli] running tests`)

    const config = await cli.getConfiguration()
    config.supportCodePaths.forEach(p => {
        delete require.cache[p]
    })
    config.supportCodeRequiredModules.forEach(p => {
        delete require.cache[p]
    })

    let output = ''
    cli.stdout = new Writable({
        write(chunk, encoding, callback) {
            output += chunk.toString()
            callback()
        },
    })

    const { success } = await cli.run()
    logger.info(`[run_cli] tests ended ${success ? 'successfully' : 'with error'}`)

    const report = JSON.parse(output)

    return normalizeReport(report)
}
