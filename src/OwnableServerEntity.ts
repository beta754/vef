import { ServerEntity } from "./ServerEntity";

export interface OwnableServerEntity extends ServerEntity {
  ownerId: string
}
