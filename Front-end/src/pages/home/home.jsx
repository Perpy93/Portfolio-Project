import { useEffect, useState } from "react"
import { Tile } from "../../components/tile/tile"
import "./home.css"
export const Home = () => {
    const [todo, setTodo] = useState("");
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

    useEffect(()=> {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks])
    return (
        <div className="home-container">
            <div className="box">
                <textarea value={todo} onChange={(e)=>setTodo(e.target.value)} style={{width: "400px", height: "200px", padding: "10px", fontSize: "14px"}} placeholder="Enter task to add"/>
                <button style={{height: "40px", cursor: "pointer"}} onClick={()=>{
                    if (!todo) return;
                    setTasks([...tasks, {todo, isDone: false}]);
                    setTodo("");
                }}>+ Add Task</button>
            </div>
            <div className="todo-container">
                <h2>My Todo's</h2>
                {
                    tasks.map((task, index)=>{
                       return <Tile 
                       key={index}
                       text={task.todo} 
                       isDone={task.isDone}
                       updateDone={()=>{
                        const newTasks = tasks.map((item, itemIndex)=>{
                            if (itemIndex === index) return {...item, isDone: !item.isDone}
                            return item;
                        });

                        setTasks(newTasks);
                       }}
                       remove = {()=>{
                        const newTasks = tasks.filter((_, i)=> i !== index);
                        setTasks(newTasks);
                       }}
                       />
                    })
                }
            </div>
        </div>
    )
}