import { TodoCreatedEventWithPayload } from "./../events/todoList.events";
import { AggregateRoot } from "../../Shared/entities/aggregate.entity";
import { Todo } from "./todo.entity";
import { TodoMapper } from "../maps/todo.map";
import { CreateTodoListDto } from "../dtos/todoList.dto";
import { TodoListMapper } from "../maps/todoList.map";

interface TodoListProps {
  todos: Todo[];
}

export class TodoList extends AggregateRoot<TodoListProps> {
  private constructor(props: TodoListProps) {
    super(props);
  }

  static create(dto: CreateTodoListDto) {
    return new TodoList({
      todos: dto.todos.map(TodoMapper.toEntity),
    });
  }

  get todos() {
    return this.props.todos;
  }

  set todos(todos: Todo[]) {
    this.props.todos = todos;
  }

  completeTodo(completeTodo: Todo, isCompleted: boolean) {
    this.todos = this.todos.map((todo) => {
      if (todo.equals(completeTodo)) {
        todo.isCompleted = isCompleted;
      }
      return todo;
    });

    // this.addDomainEvent(new ());
  }

  addTodo(todo: Todo) {
    this.todos = [...this.todos, todo];

    this.addDomainEvent(
      new TodoCreatedEventWithPayload(TodoListMapper.toDto(this))
    );
  }

  deleteTodo(deleteTodo: Todo) {
    this.todos = this.todos.filter((todo) => !todo.equals(deleteTodo));

    // EventBus.emit(new TodoDeletedEvent());
  }
}
