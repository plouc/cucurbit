exports.getStepDefinitions = async ({ cli, config, logger }) => {
    logger.debug('[step_definitions] collecting step definitions')

    logger.debug(
        '[step_definitions] supportCodePaths: %s',
        config.supportCodePaths.length > 0 ? config.supportCodePaths.join(', ') : '<none>'
    )
    config.supportCodePaths.forEach(p => {
        delete require.cache[p]
    })

    logger.debug(
        '[step_definitions] supportCodeRequiredModules: %s',
        config.supportCodeRequiredModules.length > 0
            ? config.supportCodeRequiredModules.join(', ')
            : '<none>'
    )
    config.supportCodeRequiredModules.forEach(p => {
        delete require.cache[p]
    })

    const { stepDefinitions } = cli.getSupportCodeLibrary(config)

    logger.info(`[step_definitions] found ${stepDefinitions.length} step definitions`)

    return stepDefinitions
}
