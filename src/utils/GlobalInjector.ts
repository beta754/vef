import { mkSmartRegistry } from "./SmartRegistry";

declare global {
  type InjectedServiceType = keyof InjectedServices
  interface InjectedServices { }
}

export const Injector = mkSmartRegistry<InjectedServices>();
