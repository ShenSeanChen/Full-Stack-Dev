import React, { useState, useEffect, useMemo, useRef } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';
import FunctionContextComponent from './FunctionContextComponent';
// import ClassContextComponent from './ClassContextComponent';
import {ThemeProvider} from './ThemeContext'

import Navbar from './Navbar'
import Home from "./pages/Home"
import PokemonListTab from "./pages/PokemonListTab"

function App() {
  
  ////////
  // Create Pokemon List
  ////////
  const [pokemon, setPokemon] = useState([]) //array destructuring
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [prevPageUrl, setPrevPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.next)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])


  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

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
  // NavBar and Routing
  ////////
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    // case "/home":
    //   component = <Home />
    //   break
    case "/pokemonlisttab":
      component = <PokemonListTab />
      break
  }

  ////////
  // Return values
  ////////
  // if (loading) return "Loading..."
  return (
    <>
      <Navbar />
      <component />

      <br/>
      -- useContext demo -- <br/>
      <ThemeProvider>
        <FunctionContextComponent/>
        {/* <ClassContextComponent/> */}
      </ThemeProvider>



      -- useRef demo -- <br/>
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value)}></input>
      <div>My name is {name},and it used to be {prevName.current}</div>
      <div>I rendered {renderCountRef.current} times</div>
      <button>Focus</button>
      <button onClick={
        reset_count}>Set Render Time to Zero</button>
      <br/><br/>

      -- useMemo demo -- <br/>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}></input>
      {/* <button onClick={doubleNumber}>Double Number</button> */}
      <h2>{doubleNumber}</h2>

      -- Window Width
      <div>{windowWidth}</div><br/>


      -- Learn React Hooks @useEffect -- <br/>
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
        <br/><br/>

      

      -- Learn React Hooks @useState -- <br/>
      <span> Theme: {theme} @{username} </span><br/>
      <button onClick={decrementCount}>-</button> 
      <span> {count} </span>
      
      <button onClick={incrementCount}>+</button>
      <br/><br/>

      -- Pokemon List --
        <PokemonList pokemon={pokemon}/>
        <Pagination 
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
   </>
   
  );
}

// export const ThemeContext = React.createContext()
export default App;
