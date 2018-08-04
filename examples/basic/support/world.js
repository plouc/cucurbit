const { defineSupportCode } = require('cucumber')
const { state, httpApi, cli, fixtures, snapshot } = require('@ekino/veggies')

defineSupportCode(({ setWorldConstructor }) => {
    setWorldConstructor(function() {
        state.extendWorld(this)
        fixtures.extendWorld(this)
        httpApi.extendWorld(this)
        cli.extendWorld(this)
        snapshot.extendWorld(this)
    })
})

state.install(defineSupportCode)
fixtures.install(defineSupportCode)
httpApi.install({})(defineSupportCode)
cli.install(defineSupportCode)
snapshot.install(defineSupportCode)
