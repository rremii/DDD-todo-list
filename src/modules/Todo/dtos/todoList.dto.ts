import { TodoListError } from "../errors/todoList.errors";
import { Todo } from "./../entities/todo.entity";
import { TodoDto } from "./todo.dto";

export class TodoListDto {
  constructor(public todos: TodoDto[]) {
    try {
      TodoListDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(todoList: TodoListDto) {
    if (!todoList.todos) {
      throw new TodoListError("Invalid todos");
    }
  }
}

export class CreateTodoListDto {
  constructor(public todos: Todo[]) {
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

    if (!(dto instanceof TodoDto)) {
      throw new TodoListError("Invalid todos");
    }
  }
}
