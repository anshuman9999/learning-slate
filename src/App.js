import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CodeElement, DefaultElement } from './Elements'
import './App.css'

const BoldLeaf = (props) => {
  return (
      <strong { ...props.attributes } >{ props.children }</strong>
  )
}

const DefaultLeaf = (props) => {
  return (
    <span { ...props.attributes } >{ props.children }</span>
  )
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const renderElement = useCallback(props => {

    if (props.element.type === 'code') {
      return <CodeElement {...props} />
    } else {
      return <DefaultElement {...props} />
    }

  }, [])

  const renderLeaf = useCallback(props => {
    if(props.leaf.type === "bold") {
      return <BoldLeaf { ...props } />
    } else {
      return <DefaultLeaf { ...props } />
    }
  }, [])

  return (
    <div className="base-div" >

      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          renderElement={renderElement}
          renderLeaf={ renderLeaf }
          onKeyDown={event => {
            
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {

              case '`':
                event.preventDefault()
                Transforms.setNodes(
                  editor,
                  { type: 'code' },
                  { match: n => Editor.isBlock(editor, n) }
                )
                break

              case 'b':
                event.preventDefault()
                Transforms.setNodes(
                  editor,
                  { type: 'bold' },
                  { match: n => Text.isText(n), split: true }
                )
                break
              
              default: break
              
            }
          }}
        />
      </Slate>
    </div>
  )
}


export default App;