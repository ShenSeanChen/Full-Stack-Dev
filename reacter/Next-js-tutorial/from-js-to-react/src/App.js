import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
// import ReactDOM from 'react-dom/client';

function App() {

  const app = document.getElementById('app');
    
  function Header(props) {
  console.log(props)  
  return <h1>{props.title ? props.title : "No title found"}</h1>
  }


  function HomePage() {
    const names = ["Azumi Kawaii", "Shen CHEN", "Rick & Morty"]
    const [likes, setLikes] = useState(0);

    function handleClick() {
      console.log("increment like count")
      setLikes(likes + 1)
      } 

    return (
      <div>

        <Header title="React💙" />
        <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
        </ul>
        <button onClick={handleClick}>Like</button> <text>{likes}</text>
              

      </div>
    )}

  return (HomePage())
  // ReactDOM.render(<HomePage />, app)

}

export default App;
