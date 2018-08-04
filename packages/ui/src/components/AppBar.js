import React, { Component } from 'react'
import styled from 'styled-components'
import { Folder, FileText, Info, Terminal, Play, Loader } from 'react-feather'
import { PANEL_EXPLORER, PANEL_EDITOR, PANEL_INFO, PANEL_CONSOLE } from '../lib/layout'
import AppBarPanelToggle from './AppBarPanelToggle'
import CurrentUri from './CurrentUri'

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 0 16px;
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

const RunButton = styled.span`
    margin-left: 16px;
    width: 100px;
    background: ${props => (props.isRunning ? '#eab30c' : '#b0bd2a')};
    color: #00222b;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 0 6px;
    border-radius: 2px;
    cursor: pointer;
    text-transform: ${props => (props.isRunning ? 'none' : 'uppercase')};
    letter-spacing: ${props => (props.isRunning ? 'normal' : '1px')};
    user-select: none;
    &:hover {
        background: ${props => (props.isRunning ? '#eab30c' : '#e0f136')};
    }
`

export default class AppBar extends Component {
    handleRunClick = () => {
        const { runTests, isRunning } = this.props
        if (!isRunning) {
            runTests()
        }
    }

    render() {
        const { currentUri, panels, onPanelToggle, isRunning } = this.props

        return (
            <Container>
                {currentUri ? <CurrentUri uri={currentUri} /> : 'CUCURBIT'}
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
                    {isRunning && (
                        <RunButton isRunning={true}>
                            <Loader size={18} style={{ marginRight: 6 }} />
                            running
                        </RunButton>
                    )}
                    {!isRunning && (
                        <RunButton onClick={this.handleRunClick}>
                            <Play size={18} style={{ marginRight: 6 }} />
                            run
                        </RunButton>
                    )}
                </Icons>
            </Container>
        )
    }
}
