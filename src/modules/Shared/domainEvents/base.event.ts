import { UniqueID } from "../valueObjects/uniqueID.v_o";

export type EventHandler<P> = (payload: P) => void;

export abstract class BaseEvent {
  constructor(public readonly name: string) {}
}

export abstract class BaseEventWithPayload<
  Event extends BaseEvent,
  P
> extends BaseEvent {
  constructor(baseEvent: Event, public readonly payload: P) {
    super(baseEvent.name);
  }
}

export abstract class BaseEventHandler<
  Event extends BaseEventWithPayload<BaseEvent, unknown>
> {
  private readonly _id = new UniqueID();

  get id() {
    return this._id;
  }

  constructor(public callback: EventHandler<Event["payload"]>) {}
}
