import { useEffect, useState } from "react"
import { Tile } from "../../components/tile/tile"
import "./home.css";

const backEndBaseUrl = "http://localhost:8080/api/v1";
export const Home = () => {
    const [todo, setTodo] = useState("");
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const updateDone = async (task) => {
        const isCompleted = !task?.isCompleted;

        const response = await fetch(`${backEndBaseUrl}/todos/${task._id}`, 
            {
                method: "put",
                body: JSON.stringify({isCompleted}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setRefresh(!refresh);
            }
    }

    const createTodo = async (task) => {
        
        if (!task) return;

        const response = await fetch(`${backEndBaseUrl}/todos`, {
            method: "post",
            body: JSON.stringify({task}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setTodo("");
            setRefresh(!refresh);
        }
    }


    const remove = async (task) => {

        const response = await fetch(`${backEndBaseUrl}/todos/${task._id}`, 
            {
                method: "delete",
            });

            if (response.ok) {
                setRefresh(!refresh);
            }
    }
    

    useEffect(()=> {
        const makeApiCall = async () => {
            const response = await fetch(`${backEndBaseUrl}/todos`);

            if (response.ok) {
                const result = await response.json();
                setTasks(result?.data || []);
            }
        }
        makeApiCall()
    },[refresh])
    return (
        <div className="home-container">
            <div className="box">
                <textarea value={todo} onChange={(e)=>setTodo(e.target.value)} style={{width: "400px", height: "200px", padding: "10px", fontSize: "14px"}} placeholder="Enter task to add"/>
                <button style={{height: "40px", cursor: "pointer"}} onClick={()=>{
                    if (!todo) return;
                    createTodo(todo);
                }}>+ Add Task</button>
            </div>
            <div className="todo-container">
                <h2>My Todo's</h2>
                {
                    tasks.map((task, index)=>{
                       return <Tile 
                       key={index}
                       text={task.task} 
                       isDone={task.isCompleted}
                       updateDone={()=>{
                        updateDone(task);
                       }}
                       remove = {()=>{
                        remove(task);
                       }}
                       />
                    })
                }
            </div>
        </div>
    )
}