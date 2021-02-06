import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { BoldLeaf, DefaultLeaf, ItalicLeaf, UnderlineLeaf } from './Leaf'
import Elements from './Elements'
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

    if (props.element.type === "heading-one") {
      return <Elements {...props} />
    }
    if (props.element.type === "heading-two") {
      return <Elements {...props} />
    } else {
      return <Elements {...props} />
    }

  }, [])

  const renderLeaf = useCallback(props => {
    switch (props.leaf.type) {
      case 'bold':
        return <BoldLeaf {...props} />

      case 'italic':
        return <ItalicLeaf {...props} />

      case 'underline':
        return <UnderlineLeaf {...props} />

      default: return <DefaultLeaf {...props} />
    }
  }, [])

  return (
    <div className="base-div" >

      <Slate editor={editor} value={value} onChange={value => setValue(value)}>

        <div>

          <button onMouseDown={
            (e) => {
              e.preventDefault()
              const [match] = Editor.nodes(
                editor,
                { match: n => n.type === "heading-one" }
              )

              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'heading-one' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          } >H1</button>

          <button onMouseDown={
            (e) => {
              e.preventDefault()
              const [match] = Editor.nodes(
                editor,
                { match: n => n.type === "heading-two" }
              )

              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'heading-two' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          } >H2</button>
        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {

            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {

              case '`':
                event.preventDefault()

                // const [match] = Editor.nodes(
                //   editor,
                //   { match: n => n.type === "heading-one" }
                // )

                // Transforms.setNodes(
                //   editor,
                //   { type: match ? 'paragraph' : 'heading-one' },
                //   { match: n => Editor.isBlock(editor, n) }
                // )
                break

              case 'b':
                event.preventDefault()
                toggleMark(editor, "bold")
                break

              case 'i':
                event.preventDefault()
                toggleMark(editor, "italic")

              case 'u':
                event.preventDefault()
                toggleMark(editor, "underline")

              default: break

            }
          }}
        />
      </Slate>
    </div>
  )
}

const toggleMark = (editor, format) => {
  const [match] = Editor.nodes(
    editor,
    { match: n => n.type === format }
  )

  Transforms.setNodes(
    editor,
    { type: match ? 'paragraph' : format },
    { match: n => Text.isText(n), split: true, always: true }
  )
}


export default App;