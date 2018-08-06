import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { getFeaturesDir, getStepDefinitions, loadFeature, runTests } from '../api'
import {
    PANEL_EXPLORER,
    PANEL_EDITOR,
    PANEL_INFO,
    PANEL_DEFINITIONS,
    computeLayout,
} from '../lib/layout'
import AppBar from './AppBar'
import Explorer from './Explorer'
import Editor from './Editor'
import FeatureDoc from './FeatureDoc'
import StepDefinitions from './StepDefinitions'

injectGlobal`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.6em;
}

html, body, #root {
    width: 100%;
    height: 100%;
    background: #00222b;
    color: #eee;
}

* {
    box-sizing: border-box;
}
`

const Grid = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    display: grid;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
`

export default class App extends Component {
    constructor(props) {
        super(props)

        this.editor = React.createRef()
        this.state = {
            file: null,
            feature: null,
            report: null,
            isRunning: false,
            isDirty: false,
            panels: [
                PANEL_EXPLORER,
                PANEL_EDITOR,
                PANEL_INFO,
                // PANEL_DEFINITIONS,
            ],
        }
    }

    componentDidMount() {
        getFeaturesDir().then(featuresDir => {
            this.setState({
                featuresDir: {
                    ...featuresDir,
                    isOpened: true,
                },
            })
        })

        getStepDefinitions().then(stepDefinitions => {
            this.setState({ stepDefinitions })
        })
    }

    handleFileSelect = file => {
        this.setState({
            file,
            feature: null,
            isDirty: false,
        })

        loadFeature(file.uri).then(feature => {
            this.setState({
                feature,
                isDirty: false,
            })
        })
    }

    handleEditorChange = newValue => {
        const { feature } = this.state
        if (!feature) return

        const isDirty = feature.source !== newValue
        if (isDirty !== this.state.isDirty) {
            this.setState({ isDirty })
        }
    }

    handlePanelToggle = panel => {
        const { panels } = this.state
        if (!panels.includes(panel)) {
            this.setState({
                panels: [...panels, panel],
            })
        } else {
            this.setState({
                panels: panels.filter(p => p !== panel),
            })
        }
    }

    runTests = () => {
        this.setState({
            isRunning: true,
        })

        runTests().then(report => {
            this.setState({
                report,
                isRunning: false,
            })
        })
    }

    render() {
        const {
            report,
            panels,
            featuresDir,
            stepDefinitions,
            file,
            feature,
            isRunning,
        } = this.state

        const layout = computeLayout(panels)

        return (
            <Grid style={layout.grid}>
                <AppBar
                    currentUri={file ? file.uri : null}
                    runTests={this.runTests}
                    isRunning={isRunning}
                    panels={panels}
                    onPanelToggle={this.handlePanelToggle}
                />
                {panels.includes(PANEL_EXPLORER) && (
                    <Explorer
                        style={layout.panels[PANEL_EXPLORER]}
                        dir={featuresDir}
                        report={report}
                        onSelect={this.handleFileSelect}
                    />
                )}
                {panels.includes(PANEL_EDITOR) && (
                    <Editor
                        style={layout.panels[PANEL_EDITOR]}
                        ref={this.editor}
                        featureSource={feature ? feature.source : ''}
                        onChange={this.handleEditorChange}
                    />
                )}
                {panels.includes(PANEL_INFO) && (
                    <FeatureDoc
                        style={layout.panels[PANEL_INFO]}
                        feature={feature}
                        report={report}
                    />
                )}
                {panels.includes(PANEL_DEFINITIONS) && (
                    <StepDefinitions
                        style={layout.panels[PANEL_DEFINITIONS]}
                        stepDefinitions={stepDefinitions}
                    />
                )}
            </Grid>
        )
    }
}
