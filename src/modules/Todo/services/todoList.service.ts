import { Injectable } from "../../IoC/decorators/Injectable.decorator";
import {
  CompleteTodoDto,
  CreateTodoDto,
  DeleteTodoDto,
  TodoDto,
} from "../dtos/todo.dto";
import { TodoListDto } from "../dtos/todoList.dto";
import { Todo } from "../entities/todo.entity";
import { TodoMapper } from "../maps/todo.map";
import { TodoListMapper } from "../maps/todoList.map";
import { TodoListRepository } from "../repositories/todoList.repository";

// function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   descriptor.value = function (...args: any[]) {
//     console.log(`Arguments for ${propertyKey}:`, args);
//     const result = originalMethod.apply(this, args);
//     return result;
//   };
//   Reflect.defineMetadata(
//     "design:paramtypes",
//     [String, Number],
//     target,
//     propertyKey
//   );
// }

@Injectable()
export class TodoListService {
  constructor(private _todoListRepository: TodoListRepository) {}

  get(): TodoListDto {
    const todoList = this._todoListRepository.get();

    return TodoListMapper.toDto(todoList);
  }
  createTodo(createTodoDto: CreateTodoDto) {
    const todoList = this._todoListRepository.get();

    const todoDto = new TodoDto(
      createTodoDto.id,
      createTodoDto.task,
      createTodoDto.isCompleted
    );

    const todo = Todo.create(todoDto);

    todoList.addTodo(todo);

    this._todoListRepository.save(todoList);
  }

  completeTodo(completeTodo: CompleteTodoDto) {
    const todoList = this._todoListRepository.get();

    todoList.completeTodo(
      TodoMapper.toEntity(completeTodo.todoDto),
      completeTodo.isCompleted
    );

    this._todoListRepository.save(todoList);
  }

  deleteTodo(deleteDto: DeleteTodoDto) {
    const todoList = this._todoListRepository.get();

    todoList.deleteTodo(TodoMapper.toEntity(deleteDto.todoDto));

    this._todoListRepository.save(todoList);
  }
}
