import { BaseEvent } from "./base.event";

type EventHandler = () => void;

export class EventBus {
  private static _events: {
    [key: BaseEvent["name"]]: EventHandler[];
  } = {};

  static on(event: BaseEvent, handler: EventHandler) {
    const handlers = EventBus._events[event.name];
    if (!handlers) {
      return (EventBus._events[event.name] = [handler]);
    }
    EventBus._events[event.name].push(handler);
  }

  static off(event: BaseEvent, removeHandler: EventHandler) {
    const handlers = EventBus._events[event.name];

    const filteredHandlers = handlers?.filter(
      (handler) => handler !== removeHandler
    );

    if (filteredHandlers?.length === 0) {
      delete EventBus._events[event.name];
    } else {
      EventBus._events[event.name] = filteredHandlers;
    }
  }

  static emit(event: BaseEvent) {
    const handlers = EventBus._events[event.name];

    if (!handlers) return;
    handlers.forEach((handler) => handler());
  }
}
