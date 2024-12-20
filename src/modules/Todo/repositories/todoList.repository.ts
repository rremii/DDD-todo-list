import { DomainEventBus } from "../../Shared/domainEvents/domainEvent.bus";
import { CreateTodoListDto } from "../dtos/todoList.dto";
import { TodoMapper } from "../maps/todo.map";
import { TodoList } from "./../entities/todoList.entity";
import { TodoRepository } from "./todo.repository";

export class TodoListRepository {
  constructor(private readonly _todoRepository: TodoRepository) {}

  get(): TodoList {
    const todos = this._todoRepository.get();

    const createTodoListDto = new CreateTodoListDto(
      todos.map(TodoMapper.toDto)
    );

    return TodoList.create(createTodoListDto);
  }

  save(todoList: TodoList) {
    const todos = todoList.todos;

    this._todoRepository.saveAll(todos);

    DomainEventBus.emit(todoList.domainEvents);
  }
}
