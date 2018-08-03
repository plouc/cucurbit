const express = require('express')
const app = express()
const cors = require('cors')
const { getTree, loadFeature } = require('./file_system')
const { loadGherkinDocument } = require('./document')

app.use(cors())

app.get('/features', async (req, res) => {
    const { tree } = await getTree()

    res.status(200).send(tree)
})

app.get('/features/:path', async (req, res) => {
    const text = await loadFeature(req.params.path)
    const document = await loadGherkinDocument(req.params.path)

    res.status(200).send({ text: text.toString(), document })
})

app.listen(5000, () => {
    console.log('Example app listening on port 5000!')
})
