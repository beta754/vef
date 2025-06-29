import { EntityOwner } from "../EntityOwner";
import { ServerEntityStore } from "../ServerEntityStore";
import { mkSmartRegistry } from "./SmartRegistry";

declare global {
  type InjectedServiceType = keyof InjectedServices
  interface InjectedServices {
    "OwnerStore": ServerEntityStore<EntityOwner>
  }
}

export const Injector = mkSmartRegistry<InjectedServices>();
