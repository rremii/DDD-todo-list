import { useEffect, useState } from "react";
import {
  CompleteTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
  TodoDto,
} from "../dtos/todo.dto";
import { TodoListRepository } from "../repositories/todoList.repository";
import { TodoListService } from "../services/todoList.service";
import { TodoListDto } from "../dtos/todoList.dto";
import { TodoRepository } from "../repositories/todo.repository";
import {
  TodoCompletedEvent,
  TodoCreatedEvent,
  TodoDeletedEvent,
} from "../events/todoList.events";
import { EventBus } from "../../Shared/eventBus/event.bus";

const todoRepository = new TodoRepository();
const todoListRepository = new TodoListRepository(todoRepository);
const todoListService = new TodoListService(todoListRepository);

export const useTodosList = () => {
  const [todoList, setTodoList] = useState<TodoListDto>(() =>
    todoListService.get()
  );

  const handleTodoUpdated = () => {
    const todoList = todoListService.get();
    setTodoList(todoList);
  };

  useEffect(() => {
    const todoCreatedEvent = new TodoCreatedEvent();
    const todoDeletedEvent = new TodoDeletedEvent();
    const todoCompletedEvent = new TodoCompletedEvent();

    EventBus.on(todoCreatedEvent, handleTodoUpdated);
    EventBus.on(todoDeletedEvent, handleTodoUpdated);
    EventBus.on(todoCompletedEvent, handleTodoUpdated);
    return () => {
      EventBus.off(todoCreatedEvent, handleTodoUpdated);
      EventBus.off(todoDeletedEvent, handleTodoUpdated);
      EventBus.off(todoCompletedEvent, handleTodoUpdated);
    };
  }, []);

  const addTodo = (task: string) => {
    todoListService.createTodo(new CreateTodoDto(task));
  };

  const deleteTodo = (dto: TodoDto) => {
    todoListService.deleteTodo(new DeleteTodoDto(dto));
  };

  const completeTodo = (dto: TodoDto, isCompleted: boolean) => {
    todoListService.completeTodo(new CompleteTodoDto(dto, isCompleted));
  };

  return { todos: todoList.todos, addTodo, deleteTodo, completeTodo };
};
