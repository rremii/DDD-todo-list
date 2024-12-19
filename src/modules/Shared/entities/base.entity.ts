import { UniqueID } from "../valueObjects/uniqueID.v_o";

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueID;
  protected props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: UniqueID) {
    this._id = id ? id : new UniqueID();
    this.props = props;
  }

  public equals(entity?: Entity<T>): boolean {
    if (!isEntity(entity)) {
      return false;
    }

    return this._id.equals(entity._id);
  }
}
