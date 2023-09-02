/* eslint-disable react/jsx-no-undef */
import React from 'react'
import { useState, useEffect } from 'react'
import "./Todo.css"

function Todo() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [todo, setTodo] = useState("")

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className='app'>
            <div className="input-group mb-3">
                <input
                    value={todo}
                    onChange={(e) => { setTodo(e.target.value) }}
                    type="text" className="form-control" />

                <button onClick={() => {
                    setTodos([...todos, { id: Date.now(), task: todo, status: false }])
                    setTodo("")
                }} className='btn btn-success'>Add</button>
            </div>

            <div className='taskTable mt-5'>
                <div className='pending me-5 border border-3'>
                    <h5 className='headline  mt-3'>Pending</h5>
                    {
                        todos.map((value) => {
                            if (!value.status) {

                                return (
                                    <div className='taskTabel ms-2'>
                                        <input
                                            onChange={(e) => {
                                                setTodos(todos.filter(obj => {

                                                    if (obj.id === value.id) {
                                                        obj.status = e.target.checked
                                                    }
                                                    return obj
                                                }))
                                            }} type="checkbox" />
                                        <p className='mt-3 ms-1 task'>{value.task}</p>
                                        <p
                                            onClick={(e) => {
                                                setTodos(todos.filter(obj => obj.id !== value.id))
                                            }}
                                            className='mt-3 ms-4'><i class="fa-solid fa-xmark"></i></p>
                                    </div>
                                )
                            }
                            return null
                        })
                    }
                </div>


                <div className='completed me-5 border border-3'>
                    <h5 class="headline mt-3">Completed</h5>
                    {
                        todos.map((value) => {
                            if (value.status) {

                                return (
                                    <div className='taskTabel ms-2'>
                                        <input
                                            onChange={(e) => {
                                                setTodos(todos.filter(obj => {

                                                    if (obj.id === value.id) {
                                                        obj.status = !e.target.checked
                                                    }
                                                    return obj
                                                }))
                                            }} type="checkbox" />
                                        <p className='mt-3 ms-1 task'>{value.task}</p>

                                        <p
                                            onClick={(e) => {
                                                setTodos(todos.filter(obj => obj.id !== value.id))
                                            }}
                                            className='mt-3 ms-4'><i class="fa-solid fa-xmark"></i></p>
                                    </div>
                                )
                            }
                            return null
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo