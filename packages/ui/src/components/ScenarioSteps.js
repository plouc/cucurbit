import React, { Component } from 'react'
import styled from 'styled-components'
import ScenarioStepsItem from './ScenarioStepsItem'

const Container = styled.div`
    padding: 0 0 9px;
`

export default class ScenarioSteps extends Component {
    render() {
        const { steps, report } = this.props

        return (
            <Container>
                {steps.map((step, i) => {
                    let stepReport
                    if (report) {
                        stepReport = report.steps.find(s => s.line === step.location.line)
                    }

                    return <ScenarioStepsItem key={i} step={step} report={stepReport} />
                })}
            </Container>
        )
    }
}
