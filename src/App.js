import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { CodeElement, DefaultElement } from './Elements'
import './App.css'

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

  return (
    <div class="base-div" >

      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          renderElement={renderElement}
          onKeyDown={event => {
            if (event.key === '`' && event.ctrlKey) {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { type: 'code' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          }}
        />
      </Slate>
    </div>
  )
}


export default App;