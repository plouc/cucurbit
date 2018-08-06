import React, { Component } from 'react'
import styled from 'styled-components'
import StepDefinitionsItem from './StepDefinitionsItem'

const Container = styled.div`
    min-height: 0;
    min-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
`

export default class StepDefinitions extends Component {
    render() {
        const { stepDefinitions, style } = this.props

        if (!stepDefinitions) return null

        return (
            <Container style={style}>
                {stepDefinitions.map(def => (
                    <StepDefinitionsItem key={`${def.uri}.${def.line}`} stepDefinition={def} />
                ))}
            </Container>
        )
    }
}
