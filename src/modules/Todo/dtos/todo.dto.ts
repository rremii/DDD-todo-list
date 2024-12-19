import { UniqueID } from "../../Shared/valueObjects/uniqueID.v_o";
import { TodoError } from "../errors/todo.errors";
import { v4 as uuidv4 } from "uuid";

export class CreateTodoDto {
  id = uuidv4();
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
  constructor(public todoDto: TodoDto) {
    try {
      DeleteTodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: DeleteTodoDto) {
    if (!dto.todoDto) {
      throw new TodoError("Invalid todoDto");
    }
  }
}

export class CompleteTodoDto {
  constructor(public todoDto: TodoDto, public isCompleted: boolean) {
    try {
      CompleteTodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  static validate(dto: CompleteTodoDto) {
    if (typeof dto.isCompleted !== "boolean") {
      throw new TodoError("Invalid isCompleted");
    }
  }
}

export interface ITodoDto {
  id: string;
  task: string;
  isCompleted: boolean;
}

export class TodoDto implements ITodoDto {
  constructor(
    public id: string,
    public task: string,
    public isCompleted: boolean
  ) {
    try {
      TodoDto.validate(this);
    } catch (e) {
      console.error(e);
    }
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  static deserialize(raw: string): TodoDto {
    const dtoProperties = JSON.parse(raw);

    return new TodoDto(
      dtoProperties.id,
      dtoProperties.task,
      dtoProperties.isCompleted
    );
  }

  static validate(dto: TodoDto) {
    if (typeof dto.id !== "string") {
      throw new TodoError("Invalid id");
    }
  }
}
