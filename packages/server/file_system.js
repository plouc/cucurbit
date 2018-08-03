const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const recursive = require('recursive-readdir')

const FEATURES_DIR = 'fixtures/features'

exports.getTree = async () => {
    const absFeaturesDir = path.resolve(FEATURES_DIR)
    let files = await recursive(absFeaturesDir)

    let baseDir = absFeaturesDir.split(path.sep)
    baseDir.pop()
    baseDir = baseDir.join(path.sep)

    files = files
        .filter(file => file.endsWith('.feature'))
        .map(file => file.slice(baseDir.length + 1))

    const filesTree = files.reduce((tree, file) => {
        const parts = file.split(path.sep)
        const fileName = parts.pop()

        let current = tree
        let currentPath = []
        parts.forEach((dir, i) => {
            if (i === 0) {
                if (current.children === undefined) {
                    current.name = dir
                    current.type = 'dir'
                    ;(current.path = [...currentPath, dir].join('/')), (current.children = [])
                }
            } else {
                const existing = _.find(current.children, { name: dir })
                if (existing === undefined) {
                    const node = {
                        name: dir,
                        type: 'dir',
                        path: [...currentPath, dir].join('/'),
                        children: [],
                    }
                    current.children.push(node)
                    current = node
                } else {
                    current = existing
                }
            }

            currentPath.push(dir)
        })

        current.children.push({
            name: fileName,
            path: [...currentPath, fileName].join('/'),
            type: 'file',
        })

        return tree
    }, {})

    return {
        files,
        tree: filesTree,
    }
}

exports.loadFeature = async featurePath =>
    new Promise((resolve, reject) => {
        fs.readFile(path.join('fixtures', featurePath), (err, data) => {
            resolve(data)
        })
    })
