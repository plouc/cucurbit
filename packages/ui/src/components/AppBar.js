import React, { Component } from 'react'
import styled from 'styled-components'
import { Folder, FileText, Info, Terminal } from 'react-feather'
import { PANEL_EXPLORER, PANEL_EDITOR, PANEL_INFO, PANEL_CONSOLE } from '../lib/layout'
import AppBarPanelToggle from './AppBarPanelToggle'

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 0 0 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #01313f;
`

const Icons = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

export default class AppBar extends Component {
    render() {
        const { panels, onPanelToggle } = this.props

        return (
            <Container>
                cucurbit
                <Icons>
                    <AppBarPanelToggle
                        Icon={Folder}
                        panel={PANEL_EXPLORER}
                        onToggle={onPanelToggle}
                        isActive={panels.includes(PANEL_EXPLORER)}
                    />
                    <AppBarPanelToggle
                        Icon={FileText}
                        panel={PANEL_EDITOR}
                        onToggle={onPanelToggle}
                        isActive={panels.includes(PANEL_EDITOR)}
                    />
                    <AppBarPanelToggle
                        Icon={Info}
                        panel={PANEL_INFO}
                        onToggle={onPanelToggle}
                        isActive={panels.includes(PANEL_INFO)}
                    />
                    <AppBarPanelToggle
                        Icon={Terminal}
                        panel={PANEL_CONSOLE}
                        onToggle={onPanelToggle}
                        isActive={panels.includes(PANEL_CONSOLE)}
                    />
                </Icons>
            </Container>
        )
    }
}
