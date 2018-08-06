import React, { Component } from 'react'
import styled from 'styled-components'
import Tags from './Tags'
import Scenario from './Scenario'
import StatusIcon from './StatusIcon'
import { getColorForStatus } from '../lib/status'

const Container = styled.div`
    background: #002731;
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 0;
    min-height: 0;
`

const Header = styled.div`
    height: 40px;
    background: #01313f;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
    padding: 0 16px;
    border-bottom: 1px solid #00222b;
    font-weight: bold;
`

export default class FeatureDoc extends Component {
    render() {
        const { feature, report, style } = this.props

        if (!feature) {
            return (
                <Container>
                    <Header />
                </Container>
            )
        }

        const scenarios = feature.document.feature.children.filter(
            child => child.type === 'Scenario'
        )

        let featureReport
        let status
        if (report) {
            featureReport = report.find(r => r.uri === feature.uri)
            status = featureReport.status
        }

        return (
            <Container style={style}>
                <Header
                    style={{
                        color: getColorForStatus(status, 'inherit'),
                    }}
                >
                    <StatusIcon status={status} size={16} style={{ marginRight: 9 }} />
                    {feature.document.feature.name}
                </Header>
                <Tags tags={feature.document.feature.tags} />
                {scenarios.map(scenario => {
                    let scenarioReport
                    if (featureReport) {
                        scenarioReport = featureReport.scenarios.find(
                            s => s.line === scenario.location.line
                        )
                    }

                    return (
                        <Scenario
                            key={scenario.location.line}
                            scenario={scenario}
                            report={scenarioReport}
                        />
                    )
                })}
            </Container>
        )
    }
}
