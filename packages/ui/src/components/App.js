import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { getFeaturesDir, loadFeature } from '../api'
import {
    PANEL_EXPLORER,
    PANEL_EDITOR,
    PANEL_INFO,
    PANEL_CONSOLE,
    computeLayout,
} from '../lib/layout'
import AppBar from './AppBar'
import Explorer from './Explorer'
import Editor from './Editor'
import FeatureDoc from './FeatureDoc'

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
            currentFeature: null,
            featureDoc: null,
            featureText: '',
            panels: [PANEL_EXPLORER, PANEL_INFO],
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
    }

    handleFileSelect = node => {
        this.setState({
            currentFeature: node,
            featureText: '',
            featureDoc: null,
        })

        loadFeature(node.path).then(feature => {
            this.setState({
                featureText: feature.text,
                featureDoc: feature.document,
            })
        })
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

    render() {
        const { panels, featuresDir, currentFeature, featureText, featureDoc } = this.state

        const layout = computeLayout(panels)

        return (
            <Grid style={layout.grid}>
                <AppBar panels={panels} onPanelToggle={this.handlePanelToggle} />
                {panels.includes(PANEL_EXPLORER) && (
                    <Explorer
                        style={layout.panels[PANEL_EXPLORER]}
                        dir={featuresDir}
                        onSelect={this.handleFileSelect}
                    />
                )}
                {panels.includes(PANEL_EDITOR) && (
                    <Editor
                        style={layout.panels[PANEL_EDITOR]}
                        ref={this.editor}
                        file={currentFeature}
                        featureText={featureText}
                    />
                )}
                {panels.includes(PANEL_INFO) && (
                    <FeatureDoc style={layout.panels[PANEL_INFO]} document={featureDoc} />
                )}
                {panels.includes(PANEL_CONSOLE) && (
                    <div style={layout.panels[PANEL_CONSOLE]}>CONSOLE</div>
                )}
            </Grid>
        )
    }
}
