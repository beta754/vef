export interface VersionedEntity {
  _id: string
  ownerId: string
  version: number

  lastUpdatedAt: number
}
