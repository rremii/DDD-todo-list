import { CreateTodoDto, DeleteTodoDto } from "../dtos/todo.dto";
import { TodoListRepository } from "../repositories/todoList.repository";
import { TodoListService } from "../services/todoList.service";

const todoListService = new TodoListService(new TodoListRepository());

export const useTodos = () => {
  const todos = todoListService.getAllTodos();

  const addTodo = (task: string) => {
    const dto = new CreateTodoDto(task);
    todoListService.createTodo(dto);
  };

  const deleteTodo = (id: number) => {
    const dto = new DeleteTodoDto(id);
    todoListService.deleteTodo(dto);
  };

  return { todos, addTodo, deleteTodo };
};
