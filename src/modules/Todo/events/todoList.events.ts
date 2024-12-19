import { Event } from "../../Shared/eventBus/events";

export class TodoCreatedEvent extends Event {
  constructor() {
    super("todo-created");
  }
}
