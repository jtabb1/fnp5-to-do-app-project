import React, { useState } from "react";
// import { Link } from "react-router-dom";
import '../styles/UserShowTodoRow.css'


// import TodoShow from "./TodoShow"; 

function UserShowTodoRow({ todo, onDeleteTodo, onUpdateTodo }) {
  const [newTodo, setNewTodo] = useState({ ...todo });
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(todo.is_done);

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewTodo({ ...updatedValue });
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function handleToggleComplete(e) {
    e.preventDefault();
    const name = "is_done";
    const value = !isComplete;
    const updatedValue = { ...newTodo };
    updatedValue[name] = value;
    console.log(updatedValue);
    onUpdateTodo(updatedValue);
    setNewTodo({ ...updatedValue });
    setIsComplete(!isComplete);
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <>
    <form onSubmit={handleToggleComplete}>
      <li>
        {todo.todo_name} &nbsp;
        {editMode ? 
        <button onClick={toggleEdit}>Simple Row View</button>
        : <button onClick={toggleEdit}>Details</button>}
        <button className="btn btn-danger" onClick={()=>onDeleteTodo(todo.id)}>Delete</button>
        {/* <button onClick={()=>onToggleCompleteTodo(todo.id)}>Done</button> */}
        {isComplete ? 
        <>
        <button className="btn btn-success">Remove</button>
        <button className="btn btn-edit" type="submit">UnDone</button>
        </>
        : <button className="btn" type="submit">Done</button>}
      </li>
    </form>
    {editMode && (
      <form onSubmit={handleUpdate}>
        <li className="no_bullet">
          <input 
            name="todo_name" 
            value={newTodo.todo_name} 
            onChange={handleChange} 
          />
          <button type="submit">Update To-do</button>
        </li>
      </form>
    )}
    </>
  );
}

export default UserShowTodoRow;
