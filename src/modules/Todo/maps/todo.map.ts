import { TodoDto } from "../dtos/todo.dto";
import { Todo } from "../entities/todo.entity";

export class TodoMapper {
  static toDto(entity: Todo): TodoDto {
    return new TodoDto(entity.id.toString(), entity.task, entity.isCompleted);
  }

  static toEntity(dto: TodoDto): Todo {
    return Todo.create(dto);
  }
}
