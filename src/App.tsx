import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useTodosList } from "./modules/Todo/hooks/useTodosList";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, deleteTodo } = useTodosList();

  const handleAddTodo = () => {
    if (!inputRef.current) return;
    const task = inputRef.current.value;
    addTodo(task);
    inputRef.current.value = "";
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleAddTodo}>Add todo</button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.task}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(App);
