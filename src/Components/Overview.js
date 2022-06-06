import { Component } from "react";

class Overview extends Component {
  constructor() {
    super();
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
    this.handleTaskEdit = this.handleTaskEdit.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
  }
  handleTaskDelete(event) {
    this.props.handleRemove(event.target.parentNode.id);
  }
  handleTaskEdit(event) {
    event.preventDefault();
    console.log(event.target.parentNode.id);
    console.log(event.target[0].value);
    const updatedTask = {
      taskTitle: event.target[0].value,
      id: event.target.parentNode.id,
      isBeingEdited: false,
    };
    this.props.handleEdit(updatedTask);
  }
  handleTaskToggle(event) {
    this.props.handleEditFormToggle(event.target.parentNode.id);
  }
  render() {
    const taskList = (
      <ul>
        {this.props.tasks.map((task) => (
          <li key={task.id} id={task.id}>
            {!task.isBeingEdited ? task.taskTitle : ""}
            {task.isBeingEdited && (
              <form
                onSubmit={this.handleTaskEdit}
                action="/index.html"
                method="get"
              >
                <input type="text" defaultValue={task.taskTitle} />
                <input type="submit" value="Update" />
              </form>
            )}
            {!task.isBeingEdited && (
              <button onClick={this.handleTaskToggle}>Edit</button>
            )}
            <button onClick={this.handleTaskDelete}>Delete</button>
          </li>
        ))}
      </ul>
    );
    return <div>{taskList}</div>;
  }
}

export default Overview;
