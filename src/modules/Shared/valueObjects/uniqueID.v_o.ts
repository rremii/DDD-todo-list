export class UniqueID {
  private _value: number;

  get value() {
    return this._value;
  }

  constructor() {
    this._value = new Date().getTime();
  }

  equals(object?: UniqueID): boolean {
    if (!(object instanceof UniqueID)) throw new Error("Invalid object");

    return object._value === this._value;
  }
}
