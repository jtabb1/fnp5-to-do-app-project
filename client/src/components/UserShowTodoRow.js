import React, { useState } from "react";
// import { Link } from "react-router-dom";
import '../styles/UserShowTodoRow.css'


// import TodoShow from "./TodoShow"; 

function UserShowTodoRow({ todo, onToggleCompleteTodo, onDeleteTodo, onUpdateTodo }) {
  const [newTodo, setNewTodo] = useState({ ...todo });
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewTodo({ ...updatedValue });
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function toggleComplete(id, bool) {
    // onToggleCompleteTodo(id, bool);
    setIsComplete(!isComplete);
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <>
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
      <button className="btn btn-edit" onClick={()=>toggleComplete(todo.id,true)}>UnDone</button>
      </>
      : <button className="btn" onClick={()=>toggleComplete(todo.id,false)}>Done</button>}
    </li>
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
