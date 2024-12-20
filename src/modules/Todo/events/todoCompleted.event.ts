import {
  BaseEvent,
  BaseEventHandler,
  BaseEventWithPayload,
  EventHandler,
} from "../../Shared/domainEvents/base.event";
import { TodoListDto } from "../dtos/todoList.dto";

export class TodoCompletedEvent extends BaseEvent {
  constructor() {
    super("todo-created");
  }
}

export class TodoCompletedEventWithPayload extends BaseEventWithPayload<
  TodoCompletedEvent,
  TodoListDto
> {
  constructor(public readonly todoListDto: TodoListDto) {
    super(new TodoCompletedEvent(), todoListDto);
  }
}

export class TodoCompletedEventHandler extends BaseEventHandler<TodoCompletedEventWithPayload> {
  constructor(callback: EventHandler<TodoListDto>) {
    super(callback);
  }
}
