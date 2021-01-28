import React from 'react'

export const BoldLeaf = (props) => {
    return (
        <strong {...props.attributes} >{props.children}</strong>
    )
}

export const DefaultLeaf = (props) => {
    return (
        <span {...props.attributes} >{props.children}</span>
    )
}
