import {
  BaseEvent,
  BaseEventHandler,
  BaseEventWithPayload,
  EventHandler,
} from "../../Shared/domainEvents/base.event";
import { TodoListDto } from "../dtos/todoList.dto";

export class TodoDeletedEvent extends BaseEvent {
  constructor() {
    super("todo-created");
  }
}

export class TodoDeletedEventWithPayload extends BaseEventWithPayload<
  TodoDeletedEvent,
  TodoListDto
> {
  constructor(public readonly todoListDto: TodoListDto) {
    super(new TodoDeletedEvent(), todoListDto);
  }
}

export class TodoDeletedEventHandler extends BaseEventHandler<TodoDeletedEventWithPayload> {
  constructor(callback: EventHandler<TodoListDto>) {
    super(callback);
  }
}
