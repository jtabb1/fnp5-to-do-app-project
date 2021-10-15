import React, { useState } from "react";
import '../styles/UserShowTodoRow.css'

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

  function handleToggleComplete() {
    const name = "is_done";
    const value = !isComplete;
    const updatedValue = { ...newTodo };
    updatedValue[name] = value;
    onUpdateTodo(updatedValue);
    setNewTodo({ ...updatedValue });
    setIsComplete(!isComplete);
  }

  function handleRemove() {
    const name = "is_shown_in_todos";
    const value = false;
    const updatedValue = { ...newTodo };
    updatedValue[name] = value;
    console.log(updatedValue);
    onUpdateTodo(updatedValue);
    setNewTodo({ ...updatedValue });
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <>
      <div className="row">
      {/* <li> */}
        <div className="col">
          <ul>
            <li>
              {`${todo.todo_name} (${todo.type.type_name})`} &nbsp;
            </li>
          </ul>
        </div>
        <div className="col">
          {editMode ? 
          <button onClick={toggleEdit}>Simple Row View</button>
          : <button onClick={toggleEdit}>Details</button>}
          {isComplete ? 
          <>
          <button className="" onClick={handleRemove}>✅ &nbsp; Remove</button>
          <button className="" onClick={handleToggleComplete}>Undo</button>
          </>
          : <button onClick={handleToggleComplete}> &nbsp; &nbsp; &nbsp; &nbsp; Make Done &nbsp; &nbsp; &nbsp; &nbsp;</button>}
        </div>
      {/* </li> */}
      </div>
    {editMode && (
      <div className="row">
      <form onSubmit={handleUpdate}>
        {/* <li className="no_bullet"> */}
          <input 
            name="todo_name" 
            value={newTodo.todo_name} 
            onChange={handleChange} 
          />
          <button type="submit">Update To-do</button>
        {/* </li> */}
      </form>
      <div>
        <button className="btn btn-danger" onClick={()=>onDeleteTodo(todo.id)}>Delete</button>
      </div>
      </div>
    )}
    </>
  );
}

export default UserShowTodoRow;
