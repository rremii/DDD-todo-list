import { useEffect, useState } from "react";
import { EventBus } from "../../Shared/eventBus/eventBus";
import { CreateTodoDto, DeleteTodoDto } from "../dtos/todo.dto";
import { TodoCreatedEvent } from "../events/todoList.events";
import { TodoListRepository } from "../repositories/todoList.repository";
import { TodoListService } from "../services/todoList.service";
import { TodoListDto } from "../dtos/todoList.dto";

const todoListService = new TodoListService(new TodoListRepository());

export const eventBus = new EventBus();
export const todoCreatedEvent = new TodoCreatedEvent();

export const useTodosList = () => {
  const [todoList, setTodoList] = useState<TodoListDto>(todoListService.get());
  const handleTodoCreated = () => {
    const todoList = todoListService.get();
    setTodoList(todoList);
  };

  useEffect(() => {
    eventBus.on(todoCreatedEvent, handleTodoCreated);
    return () => {
      eventBus.off(todoCreatedEvent, handleTodoCreated);
    };
  }, []);

  const addTodo = (task: string) => {
    const dto = new CreateTodoDto(task);
    todoListService.createTodo(dto);
  };

  const deleteTodo = (id: number) => {
    const dto = new DeleteTodoDto(id);
    todoListService.deleteTodo(dto);
  };

  return { todos: todoList.todos, addTodo, deleteTodo };
};
