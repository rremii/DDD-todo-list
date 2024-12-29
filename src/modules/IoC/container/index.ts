import { BaseConstructor } from "../types";

export class IoCContainer {
  private constructor(
    public _dependencies: Record<string, BaseConstructor> = {}
  ) {}

  static create() {
    return new IoCContainer();
  }

  public init(dependencies: BaseConstructor[]) {
    const filteredDependencies = dependencies.filter((dependency) =>
      Reflect.getMetadata("injectable", dependency)
    );

    this._dependencies = filteredDependencies.reduce(
      (depsObject: Record<string, BaseConstructor>, dependency) => {
        depsObject[dependency.name] = dependency;
        return depsObject;
      },
      {}
    );
  }

  public get<T extends BaseConstructor>(Entity: T): InstanceType<T> {
    const Class = this._dependencies[Entity.name];
    if (!Class) throw new Error("IoC error - Class not found");

    const params = (Reflect.getMetadata("design:paramtypes", Class) ||
      []) as BaseConstructor[];

    return new Class(...params.map((param) => this.get(param)));
  }
}
