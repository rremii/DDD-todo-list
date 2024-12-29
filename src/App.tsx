import React from "react";
import { useRef } from "react";
import { useTodosList } from "./modules/Todo/hooks/useTodosList";
import { TodoDto } from "./modules/Todo/dtos/todo.dto";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, deleteTodo, completeTodo } = useTodosList();

  const handleAddTodo = () => {
    if (!inputRef.current) return;
    const task = inputRef.current.value;
    addTodo(task);
    inputRef.current.value = "";
  };

  const handleCompleteTodo = (todo: TodoDto) => {
    completeTodo(todo, !todo.isCompleted);
  };

  const handleDeleteTodo = (todo: TodoDto) => {
    deleteTodo(todo);
  };

  return (
    <div>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleAddTodo}>Add todo</button>
      </div>
      <div>
        {todos?.map((todo) => (
          <div onClick={() => handleCompleteTodo(todo)} key={todo.id}>
            {todo.task}
            <span>
              status: {todo.isCompleted ? "completed" : "not completed"}
            </span>
            <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
