import React, { Component } from 'react'
import styled from 'styled-components'
import { PlusCircle, MinusCircle } from 'react-feather'
import DataTable from './DataTable'
import StatusIcon from './StatusIcon'

const Container = styled.div`
    font-size: 13px;
`

const Header = styled.header`
    display: grid;
    align-items: center;
    padding: 5px 16px;
    cursor: pointer;
    grid-template-columns: 16px 16px 38px 1fr;
    grid-column-gap: 9px;
    &:hover {
        background: #013c4b;
    }
`

const Keyword = styled.span`
    color: #357586;
`

const Definition = styled.div`
    color: #48ceee;
    display: grid;
    align-items: center;
    padding: 3px 16px 3px 113px;
    grid-template-columns: 1fr;
    grid-column-gap: 9px;
`

export default class ScenarioStepsItem extends Component {
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
        const { step, report } = this.props
        const { isOpened } = this.state

        let extra = []
        if (step.definition) {
            extra.push(<Definition key="definition">{step.definition.pattern}</Definition>)
        }
        if (step.argument && step.argument.type === 'DataTable') {
            extra.push(<DataTable key="dt" dataTable={step.argument} />)
        }

        return (
            <Container>
                <Header onClick={this.handleToggle}>
                    {extra.length > 0 ? (
                        isOpened ? (
                            <MinusCircle size={16} color="#3e8a9b" />
                        ) : (
                            <PlusCircle size={16} color="#3e8a9b" />
                        )
                    ) : (
                        <span />
                    )}
                    <StatusIcon status={report ? report.status : null} size={16} type="step" />
                    <Keyword>{step.keyword}</Keyword>
                    <div>{step.text}</div>
                </Header>
                {isOpened ? extra : null}
            </Container>
        )
    }
}
