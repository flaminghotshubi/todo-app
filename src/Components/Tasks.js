import React, { Component } from 'react';
import axios from 'axios';

export default class Tasks extends Component {
    constructor() {
        super();
        this.state = {
            tasksList: []
        }
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((response) => {
                this.setState({
                    tasksList: [...response.data]
                })
            }).catch(error => {
                window.alert("Error occurred while loading the tasks!");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

    }

    deleteTask = (id, event) => {
        event.preventDefault();
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then((response) => {
                let tasksList = [...this.state.tasksList];
                let updatedTasks = tasksList.filter(task => {
                    return task.id != id;
                });
                this.setState({
                    tasksList: updatedTasks
                })
            }).catch(error => {
                window.alert("Error occurred while deleting the task!");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    handleTaskEdits = (event) => {
        event.preventDefault();
        let titleInput = event.target.title.value;
        let completedInput = (event.target.completed.value === "true");
        if (titleInput.length == 0) {
            window.alert("Task title cannot be empty!")
        } else {
            axios.put(`https://jsonplaceholder.typicode.com/todos/${event.target.id.value}`, {
                title: titleInput,
                completed: completedInput
            }).then((response) => {
                let tasksList = [...this.state.tasksList];
                let updatedTasks = tasksList.map(task => {
                    if (task.id === response.data.id) {
                        return { ...response.data }
                    }
                    return task;
                });
                this.setState({
                    tasksList: updatedTasks
                })
            }).catch(error => {
                window.alert("Error occurred while editing the task!");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
    }

    handleTaskAddition = (event) => {
        event.preventDefault();
        let titleInput = event.target.title.value;
        if (titleInput.length == 0) {
            window.alert("Task title cannot be empty!")
        } else {
            axios.post(`https://jsonplaceholder.typicode.com/todos`, {
                title: titleInput,
                completed: false,
                userId: 1
            }).then((response) => {
                let tasksList = [response.data, ...this.state.tasksList];
                this.setState({
                    tasksList: tasksList
                })
            }).catch(error => {
                window.alert("Error occurred while adding the task!");
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
        event.target.reset();
    }

    render() {
        let { tasksList } = this.state;
        return (
            <>
                <div className='task-form d-flex justify-content-center p-3'>
                    <form className="input-group mb-3 border rounded-3 border-3 border-danger-subtle" method='post' onSubmit={this.handleTaskAddition}>
                        <input type="text" className="form-control" placeholder="Add a new task!" name="title"></input>
                        <button className="btn btn-danger" type="submit">Submit</button>
                    </form>
                </div>
                {
                    tasksList.length == 0 ?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border m-5" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        <div className='d-flex flex-wrap justify-content-evenly'>
                            {
                                tasksList.map(task =>
                                    <div key={task.id}>
                                        <div className="card m-3" style={{ width: "18rem" }}>
                                            <div className="card-body d-flex flex-wrap flex-row-reverse justify-content-between">
                                                {
                                                    task.completed ? <div className="p-1 mb-2 ps-2" style={{ backgroundColor: "#20b64d", position: "relative", width: "100%", color: "white" }}>Completed</div> : null
                                                }
                                                <p className="card-text" style={{ width: "100%" }}>{task.title}</p>
                                                <div className='d-flex align-items-end justify-content-end' style={{ width: "100%" }}>
                                                    <a href='#' style={{ color: "inherit" }}><i className="fa-solid fa-pen-to-square me-1" data-bs-toggle="modal" data-bs-target={`#task${task.id}Modal`}></i></a>
                                                    <a href='#' style={{ color: "inherit" }} onClick={(event) => this.deleteTask(task.id, event)}><i className="fa-solid fa-trash"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal fade" id={`task${task.id}Modal`} tabIndex="-1" aria-labelledby={`task${task.id}ModalLabel`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <form className="modal-content" method='post' onSubmit={this.handleTaskEdits}>
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={`task${task.id}ModalLabel`}>Edit Task</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <input type='text' className="form-control modal-body" name='title' defaultValue={task.title}></input>
                                                    <div className="modal-footer d-flex justify-content-between">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="completed" defaultChecked={task.completed} value={true}></input>
                                                                <label className="form-check-label">Completed</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="completed" defaultChecked={!task.completed} value={false}></input>
                                                                <label className="form-check-label">Not Completed</label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input type="hidden" name="id" value={task.id}></input>
                                                            <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Save changes</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                }
            </>
        )
    }
}
