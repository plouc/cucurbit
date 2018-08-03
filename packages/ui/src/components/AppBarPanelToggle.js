import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 100%;
    cursor: pointer;
    user-select: none;
    font-size: 13px;
    border-top: 3px solid transparent;
    border-bottom: 3px solid ${props => (props.isActive ? '#48ceee' : 'transparent')};
    opacity: ${props => (props.isActive ? 1 : 0.4)};
    &:hover {
        background: #013c4b;
    }
`

export default class AppBarPanelToggle extends Component {
    handleToggle = () => {
        const { panel, onToggle } = this.props
        onToggle(panel)
    }

    render() {
        const { Icon, panel, isActive } = this.props

        return (
            <Container isActive={isActive} onClick={this.handleToggle}>
                <Icon size={16} color="#48ceee" style={{ marginRight: 6 }} />
                {panel}
            </Container>
        )
    }
}
