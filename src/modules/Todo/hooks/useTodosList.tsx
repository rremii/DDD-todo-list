import { useEffect, useState } from "react";
import {
  CompleteTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
  TodoDto,
} from "../dtos/todo.dto";
import { TodoListService } from "../services/todoList.service";
import { TodoListDto } from "../dtos/todoList.dto";
import { DomainEventBus } from "../../Shared/domainEvents/domainEvent.bus";
import {
  TodoCreatedEvent,
  TodoCreatedEventHandler,
} from "../events/todoCreated.event";
import {
  TodoCompletedEvent,
  TodoCompletedEventHandler,
} from "../events/todoCompleted.event";
import {
  TodoDeletedEvent,
  TodoDeletedEventHandler,
} from "../events/todoDeleted.event";
import { useContainer } from "../../IoC/hooks/useContainer";

export const useTodosList = () => {
  const todoListService = useContainer(TodoListService);

  const [todoList, setTodoList] = useState<TodoListDto | undefined>(() =>
    todoListService?.get()
  );

  const handleTodoUpdated = (todoListDto: TodoListDto) => {
    setTodoList(todoListDto);
  };

  useEffect(() => {
    const todoCreatedHandler = new TodoCreatedEventHandler(handleTodoUpdated);
    const todoCompletedHandler = new TodoCompletedEventHandler(
      handleTodoUpdated
    );
    const todoDeletedHandler = new TodoDeletedEventHandler(handleTodoUpdated);

    DomainEventBus.on(new TodoCreatedEvent(), todoCreatedHandler);
    DomainEventBus.on(new TodoCompletedEvent(), todoCompletedHandler);
    DomainEventBus.on(new TodoDeletedEvent(), todoDeletedHandler);

    return () => {
      DomainEventBus.off(new TodoCreatedEvent(), todoCreatedHandler);
      DomainEventBus.off(new TodoCompletedEvent(), todoCompletedHandler);
      DomainEventBus.off(new TodoDeletedEvent(), todoDeletedHandler);
    };
  }, []);

  const addTodo = (task: string) => {
    todoListService?.createTodo(new CreateTodoDto(task));
  };

  const deleteTodo = (dto: TodoDto) => {
    todoListService?.deleteTodo(new DeleteTodoDto(dto));
  };

  const completeTodo = (dto: TodoDto, isCompleted: boolean) => {
    todoListService?.completeTodo(new CompleteTodoDto(dto, isCompleted));
  };

  return { todos: todoList?.todos, addTodo, deleteTodo, completeTodo };
};
