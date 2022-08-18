import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom/client';
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"
import reactFlexyTable from 'react-flexy-table';

function App() {

  const app = document.getElementById('app');
    
  function Header(props) {
  console.log(props)  
  return <h1>{props.title ? props.title : "No title found"}</h1>
  }


  function HomePage() {
    const default_names = ["Azumi Kawaii", "Shen CHEN", "Rick & Morty"]
    const [likes, setLikes] = useState(0);
    const [newname, setNewname] = useState('');
    const [names, setNames] = useState([]);

    const [newTask, setNewTask] = useState('');
    const [taskStatus, setTaskStatus] = useState({task: [], status:[]});
    // const [taskStatus, setTaskStatus] = useState([]);


    function handleClick() {
      console.log("increment like count")
      setLikes(likes + 1)
      } 

    function submit_newname() {
      if (!names.includes(newname.trim())) {
        setNames([...names, newname])
        console.log('add a new name')
      }
      else {
        console.log("The new name is repetitive!!")
      }
    }

    const clear_all_names = () => {
      setNames([])
    }


    const update_task_status = () => {
      setTaskStatus(
        prevTaskStatus => (
        {
          task: [...prevTaskStatus.task, newTask], 
          status:[...prevTaskStatus.status, 'Not Yet']}
        )
      )
    }

    function submit_newtask() {
      if (!taskStatus.task.includes(newTask.trim())) {
        update_task_status()
        console.log('add a new task')
      }
      else {
        console.log("The new task is repetitive!!")
      }
    }

    const clear_all_tasks = () => {
      setTaskStatus({task: [], status:[]})
    }

      
    return (
      <div className="mt-2 flex flex-col" style={{ marginLeft: '1.8rem' }}>

        <Header title="React💙" />

        {/* <br/>
        <h3>Default List: </h3>
        <ul>
        {default_names.map((name) => (
          <li key={name}>{name}</li>
        ))}
        </ul> */}
        <button onClick={handleClick}>Like</button> {likes}

        <br/>
        <h3>Input new names: </h3>
        <input type="text" name="names_input" onChange={e => setNewname(newname => e.target.value)}/> <br/>
        {/* <h3>{newname}</h3> */}
        <button name="submit_new_name" onClick={submit_newname} > Submit </button>
        <button name="clear_all_names" onClick={clear_all_names} > Clear </button>

        
        <br/>
        <h3>Newly Added Names: </h3>
        <ul>
          {names.map((name) => (
            <div>
              <li key={name}>{name}</li>
            </div>
          ))}
        </ul>
        

        <h3>Input new tasks: </h3>
        <input type="text" name="tasks_input" 
            onChange={e => setNewTask(newTask => e.target.value)} 
        /> <br/>
        {/* <h3>{newname}</h3> */}
        {/* {newTask} */}
        <button name="submit_new_task" onClick={submit_newtask} > Submit </button>
        <button name="clear_all_tasks" onClick={clear_all_tasks} > Clear </button>

        <br/>
        <h3>Newly Added Tasks: </h3>
        <ul>
          {taskStatus.task.map((task, i_task) => (
            <div>
              {/* <li key={name}>{name}</li> */}
              <input type="checkbox" key={task} 
                onChange={() => setTaskStatus(prevTaskStatus => ({
                  task: [...prevTaskStatus.task],
                  status: taskStatus.status.map((status, i_status) => (i_status != i_task) ? status : (status === 'Done!')? 'Not Yet' : 'Done!')
                  // status: taskStatus.status.map((status, i_status) => (i_status != i_task) ? status : (this.checked)? 'Done!' : 'Not Yet')
                }))}        
              />
              
              {task} -- {taskStatus.status[i_task]}
              
              
            </div>
          ))} 
        </ul>    

        {/* <ReactFlexyTable data={[taskStatus.task, taskStatus.status]}/> */}
        <div class="s-table-container">
          <table class="s-table">
              <thead>
                  <tr>
                      <th >id</th>
                      <th >Task</th>
                      <th >Status</th>               
                  </tr>
              </thead>
              <tbody>
                  
                    {taskStatus.task.map(
                      (task, i_task) => (
                        <tr>
                        
                          <td >{i_task+1}</td>
                          <td >{task}</td>
                          <td >{taskStatus.status[i_task]}</td>
                        
                        </tr>
                      )
                    )}
                  
              </tbody>
          </table>
        </div>
        
        {/* useEffect(() => {
          if (taskStatus.status.every((s) => (s === taskStatus.status[0]))) {
            alert('Yo, you finished all tasks!')
          }
        }, [taskStatus]) */}
        
              
        <br/><br/><br/>
      </div>
    )}

  return (HomePage())
  // ReactDOM.render(<HomePage />, app)

}

export default App;

// Future To-Dos
// 1. connect the task data to a database, e.g. MySQL
// 2. connect the app to a cloud, e.g. firebase (NoSQL) + gcloud
// 3. create a navbar and routing in react.js
// 4. use flask to manage the routing
// 5. create a case using useEffect
// 6. create a case using useReducer 
// 7. query google APIs and present the results 
// 8. get user data on firebase and create a dashboard to analyze it 
// 9. create APIs with my apps (for other website to read from)
