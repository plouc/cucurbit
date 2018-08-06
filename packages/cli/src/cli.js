'use strict'

/**
 * This file is heavily inspired by react-native CLI.
 * https://github.com/facebook/react-native/blob/master/local-cli/cliEntry.js
 */

const commander = require('commander')
const chalk = require('chalk')
const commands = require('./commands')
const pkg = require('../package.json')

commander.version(pkg.version)

const defaultOptParser = val => val

const handleError = err => {
    console.error()
    console.error(chalk.red(err.message) || err)
    console.error()
    if (err.stack) {
        console.error(err.stack)
        console.error()
    }
    process.exit(1)
}

const printUnknownCommand = cmdName => {
    console.log(
        [
            '',
            cmdName
                ? chalk.red(`  Unrecognized command '${cmdName}'`)
                : chalk.red(`  You didn't pass any command`),
            `  Run ${chalk.cyan('cucurbit --help')} to see list of all available commands`,
            '',
        ].join('\n')
    )
}

const registerCommand = command => {
    const options = command.options || []

    const cmd = commander
        .command(command.name, undefined, {
            noHelp: !command.description,
        })
        .description(command.description)
        .action(function() {
            const passedOptions = this.opts()
            const argv = Array.from(arguments).slice(0, -1)

            Promise.resolve()
                .then(() => command.func(passedOptions, argv))
                .catch(handleError)
        })

    options.forEach(opt =>
        cmd.option(
            opt.command,
            opt.description,
            opt.parse || defaultOptParser,
            typeof opt.default === 'function' ? opt.default() : opt.default
        )
    )
}

async function run() {
    commands.forEach(cmd => registerCommand(cmd))

    commander.parse(process.argv)

    const isValidCommand = commands.find(cmd => cmd.name.split(' ')[0] === process.argv[2])

    if (!isValidCommand) {
        printUnknownCommand(process.argv[2])
        return
    }

    if (!commander.args.length) {
        commander.help()
    }
}

run()
