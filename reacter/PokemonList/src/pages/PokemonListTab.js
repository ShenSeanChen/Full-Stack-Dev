import React, { useState, useEffect, useMemo, useRef } from 'react';
import PokemonList from '../PokemonList'
import axios from 'axios'
import Pagination from '../Pagination';

export default function PokemonListTab() {
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


    return (
        <>
            <h1>-- Pokemon List --</h1>
            
            <PokemonList pokemon={pokemon}/>
            <Pagination 
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </>
    
    )
}