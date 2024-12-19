import { CreateTodoListDto, TodoListDto } from "../dtos/todoList.dto";
import { TodoList } from "../entities/todoList.entity";
import { TodoMapper } from "./todo.map";

export class TodoListMapper {
  static toDto(entity: TodoList): TodoListDto {
    return new TodoListDto(entity.todos.map((todo) => TodoMapper.toDto(todo)));
  }

  static toEntity(dto: TodoListDto): TodoList {
    const createTodoListDto = new CreateTodoListDto(dto.todos);

    return TodoList.create(createTodoListDto);
  }
}
