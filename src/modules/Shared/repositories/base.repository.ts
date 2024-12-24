export interface IRepository<Entity> {
  save(entity: Entity): unknown;
  get(id: number): Entity[];
}
