import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useTodos } from "./modules/Todo/hooks/useTodos";
import { EventBus } from "./modules/Shared/EventBus/EventBus";
import { Event } from "./modules/Shared/EventBus/events";

const eventBus = new EventBus();

const event = new Event("test");

function App() {
  useEffect(() => {
    eventBus.on(event, () => {
      console.log("test");
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, deleteTodo } = useTodos();

  const handleAddTodo = () => {
    if (!inputRef.current) return;
    const task = inputRef.current.value;
    addTodo(task);
    inputRef.current.value = "";

    eventBus.emit(event);
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
