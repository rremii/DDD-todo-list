import { TodoDto } from "../dtos/todo.dto";
import { Todo } from "../entities/todo.entity";
import { TodoError } from "../errors/todo.errors";
import { TodoMapper } from "../maps/todo.map";
import { IRepository } from "../../Shared/repositories/base.repository";
import { Injectable } from "../../IoC/decorators/Injectable.decorator";

interface ITodoRepository extends IRepository<Todo> {
  getById(id: number): Todo;
  saveBulk(entities: Todo[]): void;
}

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor() {}

  save(entity: Todo): void {
    const todosInfo = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Array<TodoDto>;

    const newTodosDto = TodoMapper.toDto(entity);

    const existId = todosInfo.findIndex((todo) => todo.id === newTodosDto.id);

    if (existId === -1) {
      todosInfo.push(newTodosDto);
    } else {
      todosInfo[existId] = newTodosDto;
    }

    localStorage.setItem("todos", JSON.stringify(todosInfo));
  }

  saveBulk(entities: Todo[]): void {
    const todosInfo = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Array<TodoDto>;

    const newTodosDtos = entities.map(TodoMapper.toDto);
    newTodosDtos.map((dto) => {
      const existId = todosInfo.findIndex((todo) => todo.id === dto.id);

      if (existId === -1) {
        todosInfo.push(dto);
      } else {
        todosInfo[existId] = dto;
      }
    });

    localStorage.setItem("todos", JSON.stringify(todosInfo));
  }

  saveAll(entities: Todo[]): void {
    const allTodosDtos = entities.map(TodoMapper.toDto);

    localStorage.setItem("todos", JSON.stringify(allTodosDtos));
  }

  get(): Todo[] {
    const todosInfo = JSON.parse(localStorage.getItem("todos") || "[]");

    if (!Array.isArray(todosInfo))
      throw new TodoError("Todos info is not an array");

    const todoDtos = todosInfo.map(
      (todoInfo) =>
        new TodoDto(todoInfo?.id, todoInfo?.task, todoInfo?.isCompleted)
    );

    return todoDtos.map(TodoMapper.toEntity);
  }

  getById(id: number): Todo {
    const todosInfo = JSON.parse(localStorage.getItem("todos") || "[]");

    if (!Array.isArray(todosInfo))
      throw new TodoError("Todos info is not an array");

    const todoInfo = todosInfo.find((todoInfo) => todoInfo.id === id);

    const todoDto = new TodoDto(
      todoInfo?.id,
      todoInfo?.task,
      todoInfo?.isCompleted
    );

    return TodoMapper.toEntity(todoDto);
  }
}
