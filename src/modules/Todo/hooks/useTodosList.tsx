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
import { DomainEventBus } from "../../Shared/domainEvents/domainEvent.bus";
import {
  TodoCreatedEvent,
  TodoCreatedEventHandler,
} from "../events/todoList.events";

const todoRepository = new TodoRepository();
const todoListRepository = new TodoListRepository(todoRepository);
const todoListService = new TodoListService(todoListRepository);

export const useTodosList = () => {
  const [todoList, setTodoList] = useState<TodoListDto>(() =>
    todoListService.get()
  );

  const handleTodoUpdated = (todoListDto: TodoListDto) => {
    setTodoList(todoListDto);
  };

  useEffect(() => {
    const todoCreatedHandler = new TodoCreatedEventHandler(handleTodoUpdated);

    DomainEventBus.on(new TodoCreatedEvent(), todoCreatedHandler);

    return () => {
      DomainEventBus.off(new TodoCreatedEvent(), todoCreatedHandler);
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
