import { v4 } from "uuid";

export class UniqueID {
  private _value: string;

  get value() {
    return this._value;
  }

  constructor(id?: string) {
    this._value = id || v4();
  }

  equals(object?: UniqueID): boolean {
    if (!(object instanceof UniqueID)) throw new Error("Invalid object");

    return object._value === this._value;
  }

  toString() {
    return this._value;
  }
}
