import React, { Fragment, Component } from 'react'
import styled from 'styled-components'

const Definition = styled.div`
    color: #357586;
    display: grid;
    align-items: center;
    padding: 3px 16px 3px 64px;
    grid-template-columns: 46px 1fr;
    grid-column-gap: 9px;
`

const Pattern = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
`

const ParamsKey = styled.span`
    color: #357586;
`

const Params = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 3px;
`

const Param = styled.span`
    color: #48ceee;
    margin-right: 6px;
    margin-bottom: 3px;
    font-size: 13px;
    background: #002731;
    padding: 4px 9px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    line-height: 1.2em;
`

export default class StepStepDefinition extends Component {
    render() {
        const { definition } = this.props

        const params = definition.params.filter(p => p !== null)

        return (
            <Definition key="definition">
                <Pattern>{definition.pattern}</Pattern>
                {params.length > 0 && (
                    <Fragment>
                        <ParamsKey>params</ParamsKey>
                        <Params>
                            {params.map((param, i) => (
                                <Param key={i}>{param}</Param>
                            ))}
                        </Params>
                    </Fragment>
                )}
            </Definition>
        )
    }
}
