import { useEffect, useState } from "react";
import UserShowTodoAdd from "./UserShowTodoAdd";
import UserShowTodoRow from "./UserShowTodoRow";

function DoneShow({ id }) {
  const [{ data: user, error, status }, setUser] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  useEffect(() => {
    fetch(`/api/users/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((user) =>
          setUser({ data: user, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setUser({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  function handleAddDisplayTodo(newTodo) {
    setUser({
      error,
      status,
      data: {
        ...user,
        todos: [...user.todos, newTodo],
      },
    });
  }

  function handleDeleteTodo(id) {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser({
          error,
          status,
          data: {
            ...user,
            todos: user.todos.filter((todo) => todo.id !== id)
          },
        });
      }
    });
  }

  // function handleOnToggleCompleteTodo(id, bool) {
  //   fetch("/api/todos/" + id, {
  //     method: "PATCH",
  //     body: JSON.stringify(newTodo),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Todo": "application/json",
  //     },
  //   }).then( (r)=> { // PESSISMISTIC RENDERING:
  //     if (r.ok) {
  //       setUser({
  //         error,
  //         status,
  //         data: {
  //           ...user,
  //           todos: user.todos.map((todo) => {
  //             if (todo.id === newTodo.id) {
  //               todo = newTodo;
  //             }
  //             return todo;
  //           })
  //         },
  //       });
  //     }
  //   });
  // }

  function handleUpdateTodo(newTodo) {
    fetch("/api/todos/" + newTodo.id, {
      method: "PATCH",
      body: JSON.stringify(newTodo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then( (r)=> { // PESSISMISTIC RENDERING:
      if (r.ok) {
        setUser({
          error,
          status,
          data: {
            ...user,
            todos: user.todos.map((todo) => {
              if (todo.id === newTodo.id) {
                todo = newTodo;
              }
              return todo;
            })
          },
        });
        console.log(newTodo);
      }
    });
    // // OPTIMISTIC RENDERING:
    // const newTodos = todos.map((g) => {
    //   if (g.id === todo.id) {
    //     g = todo;
    //   }
    //   return g;
    // });
    // setTodos(newTodos);
  }

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <hr />

      <h2>{user.username}'s Done List</h2>
      <ul>
        {user.todos.map((todo, ix) => (
          todo.is_done && (<UserShowTodoRow 
            key={"UserShow_todo" + todo.id + ix}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
            // onToggleCompleteTodo={handleOnToggleCompleteTodo}
          />)
        ))}
      </ul>
    </div>
  );
}

export default DoneShow;