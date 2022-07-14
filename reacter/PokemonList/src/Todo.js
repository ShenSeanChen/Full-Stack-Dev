import React from 'react'
import {ACTIONS} from './pages/ReactHooks'

export default function Todo({ todo, dispatchText }) {
  return (
    <div>
        <span style={{ color:todo.complete ? '#AAA' : '#000'}}>
            {todo.nameText}
        </span>
        <button onClick={() => dispatchText({type: ACTIONS.TOGGLE_TODO, payload: { id:todo.id }})}></button>
        <button>Toggle</button>
        <button onClick={() => dispatchText({type: ACTIONS.DELETE_TODO, payload: { id:todo.id }})}></button>
        <button>Delete</button>
    </div>
  )
}
