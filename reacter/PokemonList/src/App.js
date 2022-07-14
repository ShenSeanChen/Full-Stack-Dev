import React, { useState, useEffect, useMemo, useRef } from 'react';
import {Route, Routes} from "react-router-dom";

import "./styles.css"

import Navbar from './Navbar'
import MainPage from './pages/MainPage'
import ReactHooks from "./pages/ReactHooks"
import PokemonListTab from "./pages/PokemonListTab"
import Calculator from "./pages/Calculator"
import DigitButton from './DigitButton';



function App() {

  // ////////
  // // NavBar and Routing / Replaced by React-Router-Dom
  // ////////
  // let component
  // switch (window.location.pathname) {
  //   case "/":
  //     component = <MainPage />
  //     break
  //   case "/reacthooks":
  //     component = <ReactHooks />
  //     break
  //   case "/pokemonlisttab":
  //     component = <PokemonListTab />
  //     break
  // }

  ////////
  // Return values
  ////////
  // if (loading) return "Loading..."
  return (
    <>
      <Navbar />
      <div className="container">
        {/* {component} */}
        {/* <Component /> */}
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/reacthooks" element={<ReactHooks/>} /> 
          <Route path="/pokemonlisttab" element={<PokemonListTab/>} />  
          <Route path="/calculator" element={<Calculator/>} />
          <Route exact path="/facetracker" render={() => {window.location.href="../../public/FaceTracker.html"}}></Route>

        </Routes>
        
      </div>
      <br/>
   </>   
  );
}

export default App;
