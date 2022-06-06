import { Component } from "react";
import Overview from "./Components/Overview";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      numTasks: 0,
      tasks: [],
      newTask: {
        taskTitle: "",
        id: uniqid(),
        isBeingEdited: false,
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.removeTaskHandler = this.removeTaskHandler.bind(this);
    this.editTaskHandler = this.editTaskHandler.bind(this);
    this.toggleEditFormHandler = this.toggleEditFormHandler.bind(this);
  }
  submitHandler(event) {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        numTasks: prevState.numTasks + 1,
        tasks: [...prevState.tasks, prevState.newTask],
        newTask: {
          taskTitle: "",
          id: uniqid(),
          isBeingEdited: false,
        },
      };
    });
  }
  inputChangeHandler(event) {
    this.setState((prevState) => {
      return {
        newTask: {
          taskTitle: event.target.value,
          id: prevState.newTask.id,
          isBeingEdited: false,
        },
      };
    });
  }
  removeTaskHandler(id) {
    this.setState((prevState) => {
      if (prevState.tasks.find((task) => task.id === id)) {
        return {
          numTasks: prevState.numTasks - 1,
          tasks: prevState.tasks.filter((task) => task.id !== id),
        };
      }
      return prevState;
    });
  }
  toggleEditFormHandler(id) {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.map((task) => {
          if (task.id === id) {
            return {
              taskTitle: task.taskTitle,
              id: task.id,
              isBeingEdited: !task.isBeingEdited,
            };
          }
          return task;
        }),
      };
    });
  }
  editTaskHandler(updatedTask) {
    this.setState((prevState) => {
      if (prevState.tasks.find((task) => task.id === updatedTask.id)) {
        return {
          tasks: prevState.tasks.map((task) => {
            if (task.id === updatedTask.id) {
              return {
                ...updatedTask,
              };
            }
            return task;
          }),
        };
      }
      return prevState;
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler} method="get" action="/index.html">
          <input
            onChange={this.inputChangeHandler}
            type="text"
            id="task"
            placeholder="Enter your task"
            value={this.state.newTask.taskTitle}
          />
          <input type="submit" value="Add Task" />
        </form>
        <div>{this.state.numTasks}</div>
        <Overview
          handleRemove={this.removeTaskHandler}
          handleEdit={this.editTaskHandler}
          handleEditFormToggle={this.toggleEditFormHandler}
          tasks={this.state.tasks}
        />
      </div>
    );
  }
}

export default App;
