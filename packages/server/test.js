const { inspect } = require('util')
const a = require('cucumber/lib/support_code_library_builder')
const { getTree } = require('./file_system')

console.log(a)

const dbg = subject => {
    console.log(inspect(subject, { depth: null, colors: true }))
}

const run = async () => {
    const tree = await getTree()
    dbg(tree)
}

run()

/*

const fs = require('fs')
const { Compiler, Parser } = require('gherkin')



const compiler = new Compiler()
const parser = new Parser()



fs.readFile('./fixtures/test.feature', (err, data) => {
    if (err) throw err;
    console.log(data.toString())

    const d = parser.parse(data.toString())
    console.log(inspect(d, { depth: null, color: true }))
});

/*
const { getTree } = require('./file_system')

const run = async () => {
    const tree = await getTree()
    console.log(inspect(tree, { depth: null, color: true }))
}

run()
*/
