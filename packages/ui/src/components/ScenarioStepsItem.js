import React, { Component } from 'react'
import styled from 'styled-components'
import { PlusCircle } from 'react-feather'
import DataTable from './DataTable'

const Container = styled.div``

const Header = styled.header`
    display: grid;
    grid-template-columns: 24px 40px 1fr;
    grid-column-gap: 9px;
    align-items: center;
    padding: 5px 16px;
    &:hover {
        background: #013c4b;
    }
`

const Keyword = styled.span`
    font-weight: bold;
    color: #268bd2;
    text-align: right;
`

export default class ScenarioStepsItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpened: false,
        }
    }

    render() {
        const { step } = this.props
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
                <Header>
                    {hasExtra ? (
                        isOpened ? (
                            <PlusCircle size={18} />
                        ) : (
                            <PlusCircle size={18} />
                        )
                    ) : (
                        <span />
                    )}
                    <Keyword>{step.keyword}</Keyword>
                    <div>{step.text}</div>
                </Header>
                {extra}
            </Container>
        )
    }
}
