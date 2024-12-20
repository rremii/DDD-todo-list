import {
  BaseEvent,
  BaseEventHandler,
  BaseEventWithPayload,
  EventHandler,
} from "../../Shared/domainEvents/base.event";
import { TodoListDto } from "../dtos/todoList.dto";

export class TodoCreatedEvent extends BaseEvent {
  constructor() {
    super("todo-created");
  }
}

export class TodoCreatedEventWithPayload extends BaseEventWithPayload<
  TodoCreatedEvent,
  TodoListDto
> {
  constructor(public readonly todoListDto: TodoListDto) {
    super(new TodoCreatedEvent(), todoListDto);
  }
}

export class TodoCreatedEventHandler extends BaseEventHandler<TodoCreatedEventWithPayload> {
  constructor(callback: EventHandler<TodoListDto>) {
    super(callback);
  }
}
