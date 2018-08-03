import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import { FileText } from 'react-feather'

const Header = styled.header`
    height: 40px;
    background: #01313f;
    color: #657b83;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
    padding: 0 20px 0 12px;
    border-bottom: 1px solid #00222b;
    display: flex;
    align-items: center;
`

const FileName = styled.span`
    color: #eee;
`

export default class EditorFilePath extends Component {
    render() {
        const { path } = this.props

        let content = null
        if (path) {
            const parts = path.split('/')
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
