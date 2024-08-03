import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await axios.get('http://localhost:5000/api/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        const res = await axios.post('http://localhost:5000/api/todos', { text });
        setTodos([...todos, res.data]);
        setText('');
    };

    const toggleComplete = async (id, completed) => {
        const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a todo..."
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span
                            style={{ textDecoration: todo.completed ? 'line-through' : '' }}
                            onClick={() => toggleComplete(todo._id, todo.completed)}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

