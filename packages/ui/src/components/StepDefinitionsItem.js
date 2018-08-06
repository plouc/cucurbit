import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    padding: 7px 16px;
    font-size: 13px;
    background: #01313f;
    border-top: 1px solid #00222b;
`

const UriInfo = styled.div`
    font-size: 12px;
    color: #3e8a9b;
`

export default class StepDefinitionsItem extends Component {
    render() {
        const { stepDefinition: def } = this.props

        return (
            <Container key={`${def.uri}.${def.line}`}>
                {def.pattern}
                <UriInfo>
                    {def.uri} l.
                    {def.line}
                </UriInfo>
            </Container>
        )
    }
}
