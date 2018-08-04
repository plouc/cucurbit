import React, { Component } from 'react'
import 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/gherkin'
import 'brace/theme/solarized_dark'

export default class Editor extends Component {
    handleChange = newValue => {
        //console.log({ newValue })
    }

    render() {
        const { featureSource, style } = this.props

        return (
            <div style={{ ...style, overflow: 'hidden' }}>
                <AceEditor
                    ref="ace"
                    mode="gherkin"
                    theme="solarized_dark"
                    value={featureSource}
                    onChange={this.handleChange}
                    name="editor"
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={true}
                    editorProps={{ $blockScrolling: true }}
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
