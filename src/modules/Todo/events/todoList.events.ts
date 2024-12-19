import { BaseEvent } from "../../Shared/eventBus/base.event";

export class TodoCreatedEvent extends BaseEvent {
  constructor() {
    super("todo-created");
  }
}

export class TodoDeletedEvent extends BaseEvent {
  constructor() {
    super("todo-deleted");
  }
}

export class TodoCompletedEvent extends BaseEvent {
  constructor() {
    super("todo-completed");
  }
}
