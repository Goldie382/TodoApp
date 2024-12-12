import React, { useEffect } from 'react'
import { useState } from 'react'
import {FaTrashAlt} from "react-icons/fa"

const Contents = () => {

    const [todo, setTodo] = useState("")

    const [todoList, setTodoList] = useState([])
    useEffect (() => {
        const request = async () => {
            try {
                const response = await fetch("http://localhost:3500/data");

                const result = await response.json();
                console.log(result)
                setTodoList(result);

            } catch (e) {
                console.log(e.message)
                
            }
        }
        request();
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();

        setTodo("") // Clear out the input field

        const newTodo= {
            id: todoList.length ? todoList.at(-1).id + 1 : 1,
            task: todo
        }

        const response = await fetch("http://localhost:3500/data", {
            method: "POST",
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
    
        if(response.ok) {
            const data = await response.json();
            console.log(todoList)
            setTodoList([...todoList, data]);
            setTodo("")
        }
    }

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3500/data/${id}`, {
            method: "DELETE"
        })

        console.log(id)
        
        const updateTodo = todoList.filter((todo) => todo.id !== id);

        setTodoList(updateTodo)
    }



  return (
    

    <main className='App'>
        <form className='form_field' onSubmit={handleSubmit}>
            <input 
                type="text"
                className='input_field'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
             <button type="submit">Submit</button>
        </form>

        <ul>
            {
                todoList.map((todo) => (
                    <div key={todo.id} className='item'>

                        <label>{todo.task}</label>

                        <FaTrashAlt
                        onClick={() => handleDelete(todo.id)}
                        tabIndex="0"
                        role="button"/>
                    </div>
                ))
            }
        </ul>


    </main>
  )
}

export default Contents
