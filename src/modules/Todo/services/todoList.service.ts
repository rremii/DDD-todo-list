import {
  CompleteTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
} from "../dtos/todo.dto";
import { TodoListDto } from "../dtos/todoList.dto";
import { Todo } from "../entities/todo.entity";
import { TodoListRepository } from "../repositories/todoList.repository";

export class TodoListService {
  constructor(private _todoListRepository: TodoListRepository) {}

  get(): TodoListDto {
    const todoList = this._todoListRepository.get();

    const todos = todoList.todos;

    const todosDtos = todos.map((todo) => todo.getDto());

    const todoListDto = todoList.getDto();

    todoListDto.list = todosDtos;

    return todoList;
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
