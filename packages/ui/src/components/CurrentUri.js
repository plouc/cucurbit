import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import { FileText } from 'react-feather'

const Header = styled.header`
    color: #657b83;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
    display: flex;
    align-items: center;
`

const FileName = styled.span`
    color: #eee;
`

export default class CurrentUri extends Component {
    render() {
        const { uri } = this.props

        let content = null
        if (uri) {
            const parts = uri.split('/')
            const fileName = parts.pop()
            content = (
                <Fragment>
                    <FileText size={16} style={{ marginRight: 8 }} />
                    {parts.join('/')}
                    {'/'}
                    <FileName>{fileName}</FileName>
                </Fragment>
            )
        }

        return <Header>{content}</Header>
    }
}
