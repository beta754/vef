import { Filter, SortDirection } from "mongodb"
import { Cursor } from "./Cursor"
import { EntityPatch } from "./EntityPatch"
import { VersionedEntity } from "./VersionedEntity"
import { PartialRecord } from "./utils/Record"

export abstract class VersionedEntityStore<TEntity extends VersionedEntity> {

  abstract findOne(id: string, pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity>;
  abstract findOneWithOwner(ownerId: string, id: string, pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity>;

  abstract findMany(ids: string[], pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity[]>;
  abstract findManyWithOwner(ownerId: string, ids: string[], pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity[]>;

  abstract search(query: Filter<TEntity>, next?: string, pick?: PartialRecord<keyof TEntity, number>, sort?: PartialRecord<keyof TEntity, SortDirection>): Promise<Cursor<TEntity>>;
  abstract searchWithOwner(ownerId: string, query: Filter<TEntity>, next?: string, pick?: PartialRecord<keyof TEntity, number>, sort?: PartialRecord<keyof TEntity, SortDirection>): Promise<Cursor<TEntity>>;

  abstract allWithOwner(ownerId: string): Promise<TEntity[]>
  abstract firstWithOwner(ownerId: string): Promise<TEntity>
  abstract firstWithOwner(ownerId: string, query: Filter<TEntity>): Promise<TEntity>

  abstract set(id: string, version: number, entity: TEntity, filter?: Filter<TEntity>): Promise<number>;
  abstract patch(id: string, version: number, patch: Partial<TEntity>, filter?: Filter<TEntity>): Promise<number>;
  abstract patchMany(patches: EntityPatch<TEntity>[]): Promise<number>;

  abstract unset(id: string): Promise<number>;
}
