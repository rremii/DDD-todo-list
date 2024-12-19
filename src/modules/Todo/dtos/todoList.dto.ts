import { TodoListError } from "../errors/todoList.errors";
import { ITodoDto, TodoDto } from "./todo.dto";

export interface ITodoListDto {
  todos: ITodoDto[];
}

export class TodoListDto implements ITodoListDto {
  constructor(public todos: TodoDto[]) {
    try {
      TodoListDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  static deserialize(raw: string): TodoListDto {
    const dtoProperties = JSON.parse(raw);
    return new TodoListDto(dtoProperties.todos);
  }

  static validate(todoListDto: TodoListDto) {
    if (!(todoListDto instanceof TodoListDto)) {
      throw new TodoListError("Invalid dto");
    }

    if (!todoListDto.todos) {
      throw new TodoListError("Invalid todos");
    }
  }
}

export class CreateTodoListDto {
  constructor(public todos: TodoDto[]) {
    try {
      CreateTodoListDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: CreateTodoListDto) {
    if (!dto.todos) {
      throw new TodoListError("Invalid todos");
    }

    if (!(dto instanceof CreateTodoListDto)) {
      throw new TodoListError("Invalid todos");
    }
  }
}
