import { UniqueID } from "../../Shared/valueObjects/UniqueID.v_o";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueID;
  protected props: T;

  constructor(props: T, id?: UniqueID) {
    this._id = id ? id : new UniqueID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (!isEntity(object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id.equals(object._id);
  }
}
