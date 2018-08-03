import React, { Component } from 'react'
import styled from 'styled-components'
import ScenarioStepsItem from './ScenarioStepsItem'

const Container = styled.div`
    padding: 5px 0 12px;
`

export default class ScenarioSteps extends Component {
    render() {
        const { steps } = this.props

        return (
            <Container>
                {steps.map((step, i) => (
                    <ScenarioStepsItem key={i} step={step} />
                ))}
            </Container>
        )
    }
}
