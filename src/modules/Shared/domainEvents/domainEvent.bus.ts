import { AggregateRoot } from "../entities/aggregate.entity";
import {
  BaseEvent,
  BaseEventHandler,
  BaseEventWithPayload,
} from "./base.event";

type AbstractEventHandler = BaseEventHandler<
  BaseEventWithPayload<BaseEvent, any>
>;

export class DomainEventBus {
  private static _eventsMap: {
    [key: BaseEvent["name"]]: BaseEventHandler<
      BaseEventWithPayload<BaseEvent, unknown>
    >[];
  } = {};

  static on(event: BaseEvent, handler: AbstractEventHandler): void {
    if (this._eventsMap[event.name]) this._eventsMap[event.name].push(handler);
    else this._eventsMap[event.name] = [handler];
  }

  static off(event: BaseEvent, removeHandler: AbstractEventHandler): void {
    if (this._eventsMap[event.name])
      this._eventsMap[event.name] = this._eventsMap[event.name].filter(
        (handler) => !handler.id.equals(removeHandler.id)
      );
  }

  static emit(events: BaseEventWithPayload<BaseEvent, unknown>[]): void {
    events.forEach((event) => {
      this._eventsMap[event.name].forEach((handler) =>
        handler.callback(event.payload)
      );
    });
  }
}
