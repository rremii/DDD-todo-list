import { CreateTodoListDto, TodoListDto } from "../dtos/todoList.dto";
import { eventBus, todoCreatedEvent } from "../hooks/useTodosList";
import { Todo } from "./todo.entity";

export class TodoList {
  private constructor(private _todos: Todo[] = []) {}

  static createFromDto(dto: CreateTodoListDto) {
    return new TodoList(dto.todos);
  }

  getDto(): TodoListDto {
    return new TodoListDto(this._todos.map((todo) => todo.getDto()));
  }

  get todos(): Todo[] {
    return this._todos;
  }

  getTodoById(id: number): Todo | undefined {
    return this._todos.find((todo) => todo.getDto().id === id);
  }

  addTodo(todo: Todo) {
    this._todos.push(todo);
    eventBus.emit(todoCreatedEvent);
  }

  deleteTodo(id: number) {
    this._todos = this.todos.filter((todo) => todo.getDto().id === id);
  }

  completeTodo(id: number, isCompleted: boolean) {
    this._todos = this._todos.map((todo) => {
      if (id !== todo.getDto().id) return todo;
      todo.isCompleted = isCompleted;
      return todo;
    });
  }
}
