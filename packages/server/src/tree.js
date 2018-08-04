const path = require('path')

exports.computeFeaturesTree = features => {
    return features.reduce((tree, feature) => {
        const parts = feature.uri.split(path.sep)
        const filename = parts.pop()

        let current = tree
        let currentPath = []
        parts.forEach((dir, i) => {
            if (i === 0) {
                if (current.children === undefined) {
                    current.name = dir
                    current.type = 'dir'
                    current.children = []
                }
            } else {
                const existing = current.children.find(d => d.name === dir)
                if (existing === undefined) {
                    const node = {
                        name: dir,
                        type: 'dir',
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
            name: filename,
            uri: feature.uri,
            type: 'file',
        })

        return tree
    }, {})
}
