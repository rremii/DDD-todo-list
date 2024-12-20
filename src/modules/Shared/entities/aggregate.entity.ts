import { BaseEvent, BaseEventWithPayload } from "../domainEvents/base.event";
import { UniqueID } from "../valueObjects/uniqueID.v_o";
import { Entity } from "./base.entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: BaseEventWithPayload<BaseEvent, unknown>[] = [];

  get id(): UniqueID {
    return this._id;
  }

  get domainEvents(): BaseEventWithPayload<BaseEvent, unknown>[] {
    return this._domainEvents;
  }

  protected addDomainEvent(
    domainEvent: BaseEventWithPayload<BaseEvent, unknown>
  ): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
