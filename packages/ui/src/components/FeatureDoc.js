import React, { Component } from 'react'
import styled from 'styled-components'
import Tags from './Tags'
import Scenario from './Scenario'

const Container = styled.div`
    background: #002731;
    height: 100%;
    overflow: hidden;
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
`

export default class FeatureDoc extends Component {
    render() {
        const { document, style } = this.props

        if (!document) {
            return (
                <Container>
                    <Header />
                </Container>
            )
        }

        const scenarios = document.feature.children.filter(child => child.type === 'Scenario')

        return (
            <Container style={style}>
                <Header>{document.feature.name}</Header>
                <Tags tags={document.feature.tags} />
                {scenarios.map((scenario, i) => {
                    return <Scenario key={i} scenario={scenario} />
                })}
            </Container>
        )
    }
}
