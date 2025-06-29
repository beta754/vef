import { Filter } from "mongodb";

export interface EntityPatch<TEntity> {
  _id: string
  values: Partial<TEntity>
  filter?: Filter<TEntity>
}
