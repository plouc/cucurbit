import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import { Folder, ChevronRight, ChevronDown } from 'react-feather'
import StatusIcon from './StatusIcon'

const iconSize = 14
const iconSpacing = 7
const iconsOffset = iconSize + iconSpacing

const Container = styled.aside`
    padding: 0 0 10px;
    overflow: auto;
`

const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${iconSize * 2 + iconSpacing}px;
    margin-right: ${iconSpacing}px;
`

const Name = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 12px 5px 7px;
    font-size: 14px;
    padding-left: ${props => {
        if (props.isDir) {
            return props.depth * iconsOffset + 7
        }

        return props.depth * iconsOffset + 7
    }}px;
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    color: ${props => (props.isCurrent ? '#fff' : '#ddd')};
    background: ${props => (props.isCurrent ? '#01313f' : 'transparent')};
`

class Node extends Component {
    static defaultProps = {
        depth: 0,
    }

    handleClick = () => {
        const { node, onClick } = this.props
        onClick(node)
    }

    handleDoubleClick = () => {
        const { node, onDoubleClick } = this.props
        if (node.type === 'file') {
            onDoubleClick(node)
        }
    }

    render() {
        const { node, report, depth, onClick, onDoubleClick } = this.props

        const isDir = node.type === 'dir'
        const { isOpened } = node
        const hasChild = isDir && node.children.length > 0

        let status
        if (!isDir && report) {
            const featureReport = report.find(r => r.uri === node.uri)
            status = featureReport.status
        }

        return (
            <Fragment>
                <Name
                    isDir={isDir}
                    isCurrent={node.isCurrent}
                    depth={depth}
                    onClick={this.handleClick}
                    onDoubleClick={this.handleDoubleClick}
                >
                    {isDir && (
                        <Icons>
                            {isOpened ? (
                                <ChevronDown
                                    color="#aaa"
                                    size={iconSize}
                                    style={{ flexShrink: 0 }}
                                />
                            ) : (
                                <ChevronRight
                                    color="#aaa"
                                    size={iconSize}
                                    style={{ flexShrink: 0 }}
                                />
                            )}
                            {isDir && (
                                <Folder color="#015e75" size={iconSize} style={{ flexShrink: 0 }} />
                            )}
                        </Icons>
                    )}
                    {!isDir && (
                        <StatusIcon
                            size={iconSize}
                            status={status}
                            style={{ flexShrink: 0, marginRight: iconSpacing }}
                        />
                    )}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {node.name} {status}
                    </span>
                </Name>
                {hasChild &&
                    isOpened && (
                        <Fragment>
                            {node.children.map(child => (
                                <Node
                                    key={child.name}
                                    node={child}
                                    report={report}
                                    depth={depth + 1}
                                    onClick={onClick}
                                    onDoubleClick={onDoubleClick}
                                />
                            ))}
                        </Fragment>
                    )}
            </Fragment>
        )
    }
}

export default class Explorer extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    static defaultProps = {
        style: {},
    }

    handleClick = node => {
        const { current } = this.state
        if (current) {
            current.isCurrent = false
        }

        node.isCurrent = true
        if (!node.isOpened) {
            node.isOpened = true
        } else {
            node.isOpened = false
        }

        this.setState({ current: node })
    }

    render() {
        const { dir, report, onSelect, style } = this.props

        if (dir === undefined) return null

        return (
            <Container style={style}>
                <Node
                    node={dir}
                    report={report}
                    onClick={this.handleClick}
                    onDoubleClick={onSelect}
                />
            </Container>
        )
    }
}
