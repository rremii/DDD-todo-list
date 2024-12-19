export interface BaseMapper<Entity> {
  toDto(entity: Entity): unknown;
  toEntity(raw: unknown): Entity;
}
