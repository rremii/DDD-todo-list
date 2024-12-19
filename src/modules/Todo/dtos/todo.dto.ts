import { TodoError } from "../errors/todo.errors";

export class CreateTodoDto {
  id = new Date().getTime();
  isCompleted = false;

  constructor(public task: string) {
    try {
      CreateTodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: CreateTodoDto) {
    if (dto.task.length === 0) {
      throw new TodoError("Task can't be empty");
    }
  }
}

export class DeleteTodoDto {
  constructor(public id: number) {}

  static validate(dto: DeleteTodoDto) {
    if (typeof dto.id !== "number" || dto.id < 0) {
      throw new TodoError("Invalid id");
    }
  }
}
export class CompleteTodoDto {
  constructor(public id: number, public isCompleted: boolean) {
    try {
      CompleteTodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: CompleteTodoDto) {
    if (typeof dto.id !== "number" || dto.id < 0) {
      throw new TodoError("Invalid id");
    }
    if (typeof dto.isCompleted !== "boolean") {
      throw new TodoError("Invalid isCompleted");
    }
  }
}

export class TodoDto {
  constructor(
    public id: number,
    public task: string,
    public isCompleted: boolean
  ) {
    try {
      TodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: TodoDto) {
    if (typeof dto.id !== "number" || dto.id < 0) {
      throw new TodoError("Invalid id");
    }
  }
}
