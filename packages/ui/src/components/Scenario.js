import React, { Component } from 'react'
import styled from 'styled-components'
import { ChevronRight, ChevronDown } from 'react-feather'
import Tags from './Tags'
import ScenarioSteps from './ScenarioSteps'

const Container = styled.div`
    background: #01313f;
    color: ${props => (props.isOpened ? 'inherit' : '#aaa')};
    border-top: 1px solid #00222b;
    font-size: 14px;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 16px;
    cursor: pointer;
    user-select: none;
    &:hover {
        background: #013c4b;
    }
`

const Content = styled.div``

export default class Scenario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpened: false,
        }
    }

    handleToggle = () => {
        this.setState({
            isOpened: !this.state.isOpened,
        })
    }

    render() {
        const { scenario } = this.props
        const { isOpened } = this.state

        return (
            <Container isOpened={isOpened}>
                <Header onClick={this.handleToggle}>
                    <span>
                        {isOpened ? (
                            <ChevronDown
                                size={16}
                                style={{ verticalAlign: 'middle', marginRight: 6 }}
                            />
                        ) : (
                            <ChevronRight
                                size={16}
                                style={{ verticalAlign: 'middle', marginRight: 6 }}
                            />
                        )}
                        {scenario.name}
                    </span>
                </Header>
                {isOpened && (
                    <Content>
                        <Tags tags={scenario.tags} />
                        <ScenarioSteps steps={scenario.steps} />
                    </Content>
                )}
            </Container>
        )
    }
}
