import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';
import FunctionContextComponent from '../FunctionContextComponent';
// import ClassContextComponent from '../ClassContextComponent';
import {ThemeProvider} from '../ThemeContext'

export default function ReactHooks() {

    ////////
    // Learn React Hooks - useState
    ////////
    // const [count, setCount] = useState( () => countInitial())
    // The first thing 'count' is the current state, 
    // The second thing 'setCount' is the function that allows you to update that current state
    const [username, setUsername] = useState('Sean')
    const [state, setState] = useState({count: 4, theme: 'blue'})
    const count = state.count
    const theme = state.theme

    function countInitial() {
    console.log('run function')
    return 4
    }

    function decrementCount() {
    // setCount(count - 1)
    // setCount(prevCount => prevCount - 1)
    setState(prevState => {
        return {...prevState, count: prevState.count - 1}
    })

    }

    function incrementCount() {
    // setCount(prevCount => prevCount + 1)
    setState(prevState => {
        return {...prevState, count: prevState.count + 1}
    })
    }

    ////////
    // Learn React Hook - useEffect
    ////////
    const [resourceType, setResourceType] = useState('posts')
    const [items, setItems] = useState([])

    // console.log('Render')
    // useEffect(() => {
    //   console.log('Resource Type Changed')
    // }, [resourceType])

    useEffect( () => {
    // fetch('https://pokeapi.co/api/v2/pokemon')
    fetch('https://jsonplaceholder.typicode.com/'+ resourceType)
    // fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setItems(json))
    }, [resourceType]) 


    ////////
    // Window Width
    ////////
    const [windowWidth, setwindowWidth] = useState(window.innerWidth)

    const handleResize = () => {
    setwindowWidth(window.innerWidth)
    }
    useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
    }, [])

    ////////
    // useMemo: use memoization 
    // - cache values so that you don't recompute every time 
    ////////
    const [number, setNumber] = useState(1)
    const doubleNumber = useMemo( () => {
    return slowFunction(number)
    }, [number]) //will be called only when 'number' is changed

    // const doubleNumber = useEffect(() => {
    //   return slowFunction(number)
    // }, [number])

    function slowFunction(num) {
    console.log('Calling Slow Function')
    for (let i = 0; i <= 100000000; i++) {}
    return num * 2
    }

    ////////
    // useRef Hook: you can store values like useState, 
    // but it doesn't require re-rendering 
    // when you update the value as useState does
    ////////
    const [name, setName] = useState('')
    const prevName = useRef('')
    const renderCountRef = useRef(0)
    const [renderCountState, setRenderCountState] = useState(0)
    const inputRef = useRef()

    useEffect(() => {
    prevName.current = name
    }, [name])

    useEffect(() => {
    renderCountRef.current = renderCountRef.current + 1
    // setRenderCountState(renderCountState + 1)
    console.log('count + 1')
    })

    // setRenderCountState(prevRenderCountState => {
    //   return {...prevRenderCountState, renderCountState: 0}
    // })
    const reset_count = () => {
    setRenderCountState(0)
    renderCountRef.current=0
    }

    function focus() {
    inputRef.current.focus()
    }

    ////////
    // useContext
    // also learning why function component is much cleaner than a class component
    ////////
    const [darkTheme, setDarkTheme] = useState(true)
    function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
    }


    ////////
    // useReducer: similar to redux
    // Convert you current state to a new version of your state,
    // based on the action you sent it
    ////////

    //////// Counter Example
    const ACTIONS = {
        INCREMENT: 'increment',
        DECREMENT: 'decrement',
        ADD_TODO: 'add-todo'
    }

    const [stateCounter, dispatchCounter] = useReducer(reducerCounter, {countReducer: 0})
    // const [countReducer, setCountReducer] = useState(0)

    function reducerCounter(stateCounter, action) {
        switch (action.type) {
            case ACTIONS.INCREMENT:
                return {countReducer: stateCounter.countReducer + 1}
            case ACTIONS.DECREMENT:
                return {countReducer: stateCounter.countReducer - 1}
            default:
                return stateCounter
        }
        // return {countReducer: stateCounter.countReducer + 1}
    }

    function increment() {
        // setCountReducer(prevCountReducer => prevCountReducer + 1)
        dispatchCounter({type: ACTIONS.INCREMENT})
    }

    function decrement() {
        // setCountReducer(prevCountReducer => prevCountReducer - 1)
        dispatchCounter({type: ACTIONS.DECREMENT})
    }

    //////// Text Example
    const [todos, dispatchText] = useReducer(reducerText, [])
    const [nameText, setNameText] = useState('')

    function newTodo(nameText) {
        return {id: Date.now(), nameText:nameText, complete: false}
    }

    function reducerText(todos, action) {
        switch (action.type) {
            case ACTIONS.ADD_TODO:
                return [...todos, newTodo(action.payload.nameText)]
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatchText({type: ACTIONS.ADD_TODO, payload: {nameText:nameText}})
        setNameText('')
    }

    console.log(todos)

    return (
        <>
            <h1>React Hooks</h1>

            <h2>-- useReducer demo --</h2>
                <h4> Counter </h4>
                <button onClick={decrement}>-</button>
                <span>{stateCounter.countReducer}</span>
                <button onClick={increment}>+</button>

                <h4> Text </h4>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={nameText} onChange={e => setNameText(e.target.value)}/>
                </form>

            <br/><br/>


            <h2>-- useContext demo --</h2>
            <ThemeProvider>
            <FunctionContextComponent/>
            {/* <ClassContextComponent/> */}
            </ThemeProvider>



            <h2>-- useRef demo -- </h2>
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)}></input>
            <div>My name is {name},and it used to be {prevName.current}</div>
            <div>I rendered {renderCountRef.current} times</div>
            <button>Focus</button>
            <button onClick={
            reset_count}>Set Render Time to Zero</button>
            <br/><br/>

            <h2>-- useMemo demo --</h2>
            <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}></input>
            {/* <button onClick={doubleNumber}>Double Number</button> */}
            <h2>{doubleNumber}</h2>

            <h2>-- Window Width --</h2>
            <div>{windowWidth}</div>


            <h2>-- Learn React Hooks @useEffect --</h2>
            <div>
            <button onClick={ () => setResourceType('posts') }>Posts</button>
            <button onClick={ () => setResourceType('users') }>Users</button>
            <button onClick={ () => setResourceType('comments') }>Comments</button>
            </div>
                <br/>
            <h1>{resourceType}</h1>
            {items.map(item => {
                return <pre>{JSON.stringify(item)}</pre>
            })}
            <br/>

            <h2>-- Learn React Hooks @useState --</h2>
            <span> Theme: {theme} @{username} </span><br/>
            <button onClick={decrementCount}>-</button> 
            <span> {count} </span>
            
            <button onClick={incrementCount}>+</button>
            <br/><br/>
        </>
    )
}