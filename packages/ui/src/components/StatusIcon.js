import React, { Component } from 'react'
import { Box, Slash, Check, X, Layers } from 'react-feather'
import { getColorForStatus } from '../lib/status'

export default class StatusIcon extends Component {
    static defaultProps = {
        type: 'feature',
        style: {},
    }

    render() {
        const { type, size, status, style } = this.props

        const color = getColorForStatus(status)
        const props = { size, color, style }

        if (status === undefined || status === null) {
            if (type === 'feature') return <Layers {...props} />
            if (type === 'scenario') return <Box {...props} />
            return <span />
        }

        if (status === 'passed') return <Check {...props} />
        if (status === 'failed') return <X {...props} />

        return <Slash {...props} />
    }
}
