import React from 'react'

const BoldLeaf = (props) => {
    return (
        <strong { ...props.attributes } >{ props.children }</strong>
    )
}

export default BoldLeaf