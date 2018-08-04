import React, { Component } from 'react'
import { Box, Slash, Check, X } from 'react-feather'
import { getColorForStatus } from '../lib/status'

export default class StatusIcon extends Component {
    static defaultProps = {
        style: {},
    }

    render() {
        const { size, status, style } = this.props

        const color = getColorForStatus(status)
        const props = { size, color, style }

        if (status === undefined || status === null) return <Box {...props} />
        if (status === 'passed') return <Check {...props} />
        if (status === 'failed') return <X {...props} />

        return <Slash {...props} />
    }
}
