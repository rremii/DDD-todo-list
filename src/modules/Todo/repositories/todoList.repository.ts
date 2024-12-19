import { TodoDto } from "../dtos/todo.dto";
import { CreateTodoListDto } from "../dtos/todoList.dto";
import { Todo } from "../entities/todo.entity";
import { TodoList } from "./../entities/todoList.entity";

export class TodoListRepository {
  constructor() {}

  get(): TodoList {
    const todoListDto = JSON.parse(localStorage.getItem("todoList") || "");

    const todos = todoListDto.todos.map((dto) => Todo.createFromDto(dto));

    if (todoListDto) {
      return TodoList.createFromDto(todoListDto);
    } else {
      const todosDtos = JSON.parse(
        localStorage.getItem("todos") || "[]"
      ) as TodoDto[];
      const todos = todosDtos.map((dto) => Todo.createFromDto(dto));
      const createListDto = new CreateTodoListDto(todos);

      const todoList = TodoList.createFromDto(createListDto);

      this.save(todoList);

      return todoList;
    }
  }

  save(todoList: TodoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList.getDto()));
  }
}
