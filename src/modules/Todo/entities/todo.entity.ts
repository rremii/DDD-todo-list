import { CreateTodoDto, TodoDto } from "../dtos/todo.dto";

export class Todo {
  private constructor(
    private _id: number,
    private _task: string,
    private _isCompleted: boolean
  ) {}

  public static createFromDto(dto: CreateTodoDto) {
    return new Todo(dto.id, dto.task, dto.isCompleted);
  }

  public getDto() {
    return new TodoDto(this._id, this._task, this._isCompleted);
  }

  set isCompleted(value: boolean) {
    this._isCompleted = value;
  }
}
