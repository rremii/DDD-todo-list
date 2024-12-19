import { Entity } from "./base.entity";
// import { BaseEvent } from "../eventBus/base.event";

// type EventHandler = () => void;

export abstract class AggregateRoot<T> extends Entity<T> {
  //   private static _events: {
  //     [key: BaseEvent["name"]]: EventHandler[];
  //   } = {};
  //   static on(event: BaseEvent, handler: EventHandler) {
  //     const handlers = AggregateRoot._events[event.name];
  //     if (!handlers) {
  //       return (AggregateRoot._events[event.name] = [handler]);
  //     }
  //     AggregateRoot._events[event.name].push(handler);
  //   }
  //   static off(event: BaseEvent, removeHandler: EventHandler) {
  //     const handlers = AggregateRoot._events[event.name];
  //     const filteredHandlers = handlers?.filter(
  //       (handler) => handler !== removeHandler
  //     );
  //     if (filteredHandlers?.length === 0) {
  //       delete AggregateRoot._events[event.name];
  //     } else {
  //       AggregateRoot._events[event.name] = filteredHandlers;
  //     }
  //   }
  //   static emit(event: BaseEvent) {
  //     const handlers = AggregateRoot._events[event.name];
  //     if (!handlers) return;
  //     handlers.forEach((handler) => handler());
  //   }
}
