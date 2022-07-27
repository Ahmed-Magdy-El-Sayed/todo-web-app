import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateJobs} from "../components/store"
import Styles from "../styles/toDo.module.css"

let lastTask = false;// to can delete the task when todo list contain one task

export default function ToDo(){
    let dispatch =useDispatch()
    const {user} = useSelector(state=>state)
    const [tasks,setTasks]=useState(user.jobs);
    
    useEffect(()=>{
        dispatch(updateJobs(tasks));// to update tasks in redux and local storage
        if(user.jobs.length && !lastTask) setTasks(user.jobs);//to show tasks when reload
        lastTask = false;
    })

    let addTask = e =>{
        if(e.target.parentElement.firstChild.value){
            setTasks(
                [...tasks,e.target.parentElement.firstChild.value]
            )
            e.target.parentElement.firstChild.value = "";
        }
    }
    let removeTask = e =>{
        if(tasks.length === 1) lastTask = true;
            setTasks(
                tasks.filter(t=>{return t !== e.target.value})
            )
    }
    return (
        <div className={Styles.toDo}>
            <h1>ToDoList</h1>
                <ol>
                    {tasks.map((t,i)=>{
                        return(
                        <li key={i}>{ i+1+". "+t+"   "}
                            <button value={t} onClick={e=>{removeTask(e)}}>Done</button>
                        </li>
                        )
                    })}
                </ol>
                <form onSubmit={e => e.preventDefault()}>
                    <input type ="text" 
                        placeholder="Enter your task"
                    ></input>
                    <button type="button" onClick={e => addTask(e)}>Add Task</button>
                </form>
        </div>
    )
}