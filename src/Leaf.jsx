import React from 'react'

export const BoldLeaf = (props) => {
    return (
        <strong {...props.attributes} >{props.children}</strong>
    )
}

export const ItalicLeaf = (props) => {
    return (
        <em { ...props.attributes } >{ props.children }</em>
    )
}

export const DefaultLeaf = (props) => {
    return (
        <span {...props.attributes} >{props.children}</span>
    )
}
