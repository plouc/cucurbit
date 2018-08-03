import React, { Component } from 'react'
import styled from 'styled-components'
import { Tag as TagIcon } from 'react-feather'

const Container = styled.div`
    background: #01313f;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 9px 16px 0;
`

const Tag = styled.span`
    margin-right: 6px;
    font-size: 13px;
    background: #002731;
    padding: 4px 9px;
    border-radius: 2px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    line-height: 1.2em;
`

export default class Tags extends Component {
    render() {
        const { tags } = this.props

        if (tags.length === 0) return null

        return (
            <Container>
                {tags.map(tag => {
                    return (
                        <Tag key={tag.name}>
                            <TagIcon size={14} color="#48ceee" style={{ marginRight: 7 }} />
                            {tag.name}
                        </Tag>
                    )
                })}
            </Container>
        )
    }
}
