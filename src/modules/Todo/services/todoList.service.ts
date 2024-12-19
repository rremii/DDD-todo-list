import {
  CompleteTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
  TodoDto,
} from "../dtos/todo.dto";
import { Todo } from "../entities/todo.entity";
import { TodoListRepository } from "../repositories/todoList.repository";

export class TodoListService {
  constructor(private _todoListRepository: TodoListRepository) {}

  getAllTodos(): TodoDto[] {
    const todoList = this._todoListRepository.get();

    return todoList.todos.map((todo) => todo.getDto());
  }

  createTodo(dto: CreateTodoDto) {
    const todoList = this._todoListRepository.get();

    const todo = Todo.createFromDto(dto);

    todoList.addTodo(todo);

    this._todoListRepository.save(todoList);
  }

  completeTodo(dto: CompleteTodoDto) {
    const todoList = this._todoListRepository.get();

    todoList.completeTodo(dto.id, dto.isCompleted);

    this._todoListRepository.save(todoList);
  }

  deleteTodo(dto: DeleteTodoDto) {
    const todoList = this._todoListRepository.get();

    todoList.deleteTodo(dto.id);

    this._todoListRepository.save(todoList);
  }
}
