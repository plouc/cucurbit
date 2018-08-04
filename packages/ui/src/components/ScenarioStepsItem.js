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
    padding: 5px 16px 5px;
    cursor: pointer;
    grid-template-columns: 16px 16px 38px 1fr;
    grid-column-gap: 9px;    
    &:hover {
        background: #013c4b;
    }
`

const Keyword = styled.span`
    color: #357586;
    text-align: left;
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

        const hasExtra = !!step.argument

        let extra = null
        if (isOpened && hasExtra) {
            if (step.argument.type === 'DataTable') {
                extra = <DataTable key="dt" dataTable={step.argument} />
            }
        }

        return (
            <Container>
                <Header onClick={this.handleToggle}>
                    {hasExtra ? (
                        isOpened ? (
                            <MinusCircle size={16} color="#3e8a9b" />
                        ) : (
                            <PlusCircle size={16} color="#3e8a9b" />
                        )
                    ) : (
                        <span />
                    )}
                    <StatusIcon status={report ? report.status : null} size={16} type="step"/>
                    <Keyword>{step.keyword}</Keyword>
                    <div>{step.text}</div>
                </Header>
                {extra}
            </Container>
        )
    }
}
