import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';

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
  // useMemo: 
  ////////

  ////////
  // Return values
  ////////
  // if (loading) return "Loading..."
  return (
    <>
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

export default App;
