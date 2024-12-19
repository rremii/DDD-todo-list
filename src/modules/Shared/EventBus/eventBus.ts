import { Event } from "./events";

type EventHandler = () => void;

type Events = Record<string, EventHandler[]>;

export class EventBus {
  private _events: Events = {};

  constructor() {}

  on(event: Event, handler: EventHandler) {
    const handlers = this._events[event.name] || [];

    if (handlers.includes(handler)) return;

    handlers.push(handler);

    this._events[event.name] = handlers;
  }

  off(event: string, removeHandler: EventHandler) {
    const handlers = this._events[event];

    if (!handlers) return;

    handlers.filter((handler) => handler !== removeHandler);

    if (handlers.length === 0) {
      delete this._events[event];
    } else {
      this._events[event] = handlers;
    }
  }

  emit(event: Event) {
    const handlers = this._events[event.name];
    if (!handlers) return;

    handlers.forEach((handler) => handler());
  }
}
