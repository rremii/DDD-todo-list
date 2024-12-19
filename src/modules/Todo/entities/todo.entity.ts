import { TodoDto } from "../dtos/todo.dto";
import { Entity } from "../../Shared/entities/base.entity";
import { UniqueID } from "../../Shared/valueObjects/uniqueID.v_o";

interface ITodoProps {
  task: string;
  isCompleted: boolean;
}

export class Todo extends Entity<ITodoProps> {
  private constructor(props: ITodoProps, id?: UniqueID) {
    super(props, id);
  }

  public static create(dto: TodoDto) {
    return new Todo(
      {
        task: dto.task,
        isCompleted: dto.isCompleted,
      },
      new UniqueID(dto.id)
    );
  }

  get task() {
    return this.props.task;
  }
  get isCompleted() {
    return this.props.isCompleted;
  }

  set isCompleted(value: boolean) {
    this.props.isCompleted = value;
  }
}
