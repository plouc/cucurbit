const { promisify } = require('util')
const resolve = promisify(require('resolve'))
const Registry = require('./src/registry')

const run = async () => {
    const r = await resolve('cucumber')
    console.log(r)
    const registry = new Registry({
        cwd: 'fixtures',
    })

    const tree = await registry.getTree()
    console.log(require('util').inspect(tree, { depth: null, colors: true }))
}

run()
