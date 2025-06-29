import { ServerEntity } from "./ServerEntity"

export class EntityOwner implements ServerEntity {

  readonly userIds: string[] = Array.of<string>()

  constructor(
    readonly _id: string
  ) { }
}
