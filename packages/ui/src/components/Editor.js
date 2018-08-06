import React, { Component } from 'react'
import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/gherkin'
import 'brace/theme/solarized_dark'

export default class Editor extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.featureSource !== this.props.featureSource ||
            nextProps.style.gridColumnStart !== this.props.style.gridColumnStart
        )
    }

    render() {
        const { featureSource, onChange, style } = this.props

        return (
            <div style={{ ...style, overflow: 'hidden' }}>
                <AceEditor
                    ref="ace"
                    mode="gherkin"
                    theme="solarized_dark"
                    value={featureSource}
                    onChange={onChange}
                    name="editor"
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={true}
                    editorProps={{
                        $blockScrolling: Infinity,
                    }}
                    fontSize={13}
                    wrapEnabled={false}
                    width="100%"
                    height="100%"
                    setOptions={{
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                />
            </div>
        )
    }
}
