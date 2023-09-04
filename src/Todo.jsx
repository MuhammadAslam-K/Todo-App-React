import React, { useState, useEffect, useRef } from 'react'
import "./Todo.css"

function Todo() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [todo, setTodo] = useState("")
    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        inputRef.current.focus()

    }, [todos]);

    return (
        <div className='app'>
            <div className="input-group mb-3">
                <input
                    value={todo}
                    onChange={(e) => { setTodo(e.target.value) }}
                    type="text" ref={inputRef} className="form-control" />


                <button onClick={() => {
                    if (todos.some(item => item.task === todo)) {
                        setError(true);
                    } else if (todo.length < 1) {
                        setValid(true)
                    }
                    else {
                        setError(false)
                        setValid(false)
                        setTodos([...todos, { id: Date.now(), task: todo, status: false }]);
                        setTodo("");
                    }
                }} className='btn btn-success'>Add</button>
            </div>
            {error && <p style={{ color: 'red' }} className='error'>The Task already Exists</p>}
            {valid && <p style={{ color: 'red' }} className='error'>Please enter the value</p>}

            <div className='taskTable mt-5'>
                <div className='pending me-5 border border-3'>
                    <h5 className='headline  mt-3'>Pending</h5>
                    {
                        todos.map((value) => {
                            if (!value.status) {

                                return (
                                    <div className='taskTabel ms-3'>
                                        <input className='check-box'
                                            onChange={(e) => {
                                                setTodos(todos.filter(obj => {

                                                    if (obj.id === value.id) {
                                                        obj.status = e.target.checked
                                                    }
                                                    return obj
                                                }))
                                            }} type="checkbox" />

                                        <p className='mt-3 ms-1 task testimonial_text tooltip-trigger' data-bs-toggle="tooltip" data-bs-placement="top" title={value.task}>{value.task}</p>
                                        <p
                                            onClick={(e) => {
                                                setTodos(todos.filter(obj => obj.id !== value.id))
                                            }}
                                            className='mt-3 ms-4 delete'><i class="fa-solid fa-xmark"></i></p>
                                    </div>
                                )
                            }
                            return null
                        })
                    }
                </div>


                <div className='completed me-5 border border-3'>
                    <h5 className="headline mt-3">Completed</h5>
                    {
                        todos.map((value) => {
                            if (value.status) {

                                return (
                                    <div className='taskTabel ms-3'>
                                        <input className='check-box'
                                            onChange={(e) => {
                                                setTodos(todos.filter(obj => {

                                                    if (obj.id === value.id) {
                                                        obj.status = !e.target.checked
                                                    }
                                                    return obj
                                                }))
                                            }} type="checkbox" />
                                        <p className='mt-3 ms-1 task testimonial_text tooltip-trigger' data-bs-toggle="tooltip" data-bs-placement="right" title={value.task}>{value.task}</p>

                                        <p
                                            onClick={(e) => {
                                                setTodos(todos.filter(obj => obj.id !== value.id))
                                            }}
                                            className='mt-3 ms-4 delete'><i class="fa-solid fa-xmark"></i></p>
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