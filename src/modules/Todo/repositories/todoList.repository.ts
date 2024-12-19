import { CreateTodoListDto, TodoListDto } from "../dtos/todoList.dto";
import { Todo } from "../entities/todo.entity";
import { TodoList } from "./../entities/todoList.entity";

export class TodoListRepository {
  constructor() {}

  get(): TodoList {
    const todoListDtoInfo = JSON.parse(localStorage.getItem("todoList") || "");

    if (
      todoListDtoInfo &&
      todoListDtoInfo.todos &&
      Array.isArray(todoListDtoInfo.todos)
    ) {
      const todoListDto = new CreateTodoListDto(
        todoListDtoInfo.todos.map((dto) => Todo.createFromDto(dto))
      );
      return TodoList.createFromDto(todoListDto);
    } else {
      const createListDto = new CreateTodoListDto([]);

      const todoList = TodoList.createFromDto(createListDto);

      this.save(todoList);
      return todoList;
    }
  }

  save(todoList: TodoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList.getDto()));
  }
}
