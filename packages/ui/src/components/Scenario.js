import React, { Component } from 'react'
import styled from 'styled-components'
import { ChevronRight, ChevronDown } from 'react-feather'
import Tags from './Tags'
import ScenarioSteps from './ScenarioSteps'
import StatusIcon from './StatusIcon'

const Container = styled.div`
    background: #01313f;
    color: ${props => (props.isOpened ? 'inherit' : '#3e8a9b')};
    border-top: 1px solid #00222b;
    font-size: 13px;
`

const Header = styled.header`
    display: grid;
    align-items: center;
    padding: 9px 16px 9px;
    cursor: pointer;
    user-select: none;
    grid-template-columns: 16px 1fr 16px;
    grid-column-gap: 9px;
    font-weight: ${props => (props.isOpened ? 'bold' : 'normal')};
    &:hover {
        background: #013c4b;
    }
`

const Content = styled.div``

export default class Scenario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpened: true,
        }
    }

    handleToggle = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        })
    }

    render() {
        const { scenario, report } = this.props
        const { isOpened } = this.state

        return (
            <Container isOpened={isOpened}>
                <Header isOpened={isOpened} onClick={this.handleToggle}>
                    <StatusIcon
                        status={report ? report.status : null}
                        size={16}
                        type="scenario"
                        style={{ opacity: isOpened ? 1 : .5 }}
                    />
                    <span>
                        {scenario.name}
                    </span>
                    {isOpened ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                </Header>
                {isOpened && (
                    <Content>
                        <Tags tags={scenario.tags} />
                        <ScenarioSteps steps={scenario.steps} report={report} />
                    </Content>
                )}
            </Container>
        )
    }
}
