import React, { Fragment, Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 9px 16px 9px 41px;
    padding: 9px 16px;
    display: grid;
    grid-column-gap: 9px;
    font-size: 12px;
    background: #002731;
`

export default class DataTable extends Component {
    render() {
        const { dataTable } = this.props

        if (dataTable.rows.length === 0) return null

        const firstRow = dataTable.rows[0]
        const gridStyle = {
            gridTemplateColumns: firstRow.cells.map(() => '1fr').join(' '),
        }

        return (
            <Container style={gridStyle}>
                {dataTable.rows.map((row, i) => {
                    return (
                        <Fragment key={i}>
                            {row.cells.map((cell, j) => {
                                return <div key={j}>{cell.value}</div>
                            })}
                        </Fragment>
                    )
                })}
            </Container>
        )
    }
}
