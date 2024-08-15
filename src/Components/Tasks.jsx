import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const Tasks = ({ user, token }) => {
    const API = import.meta.env.VITE_BASE_URL;
    const [tasks, setTasks] = useState([]);

    const completeTask = (id) => {
        const task = tasks.find(task => task.task.id === id)
        const updatedTask = { ...task, completed: !task.completed }
        fetch(`${API}/users/${user.user_id}/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedTask),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                // Map over the previous state of tasks to create a new array with the updated task
                setTasks((prevTasks) => prevTasks).map(task => task.task_id === id ? updatedTask : task )
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch(`${API}/users/${user.user_id}/tasks`, {
           headers: {
                "Authorization": token
           } 
        })
            .then(res => res.json())
            .then(res => setTasks(() => res))
    }, [user])

    // Sort the tasks by ID number so they keep the same order when updating them
    const sortedTasks = tasks.sort((a,b) => a.task_id < b.task_id ? -1: 1)

    return (
        <Container>
            <h2>Task List</h2>
            <Table striped bordered hover responsive className ="table-sm">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 && sortedTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                            <td>
                                <Button
                                    variant={task.completed ? 'light' : 'dark'}
                                    onClick={() => completeTask(task.task_id)}
                                >
                                    {task.completed ? 'Undo' : 'Complete'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Tasks;