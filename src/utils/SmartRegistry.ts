import { getValueOrThrow, PartialRecord, hasValue } from "./Record";

declare global {
  type InjectedServiceType = keyof InjectedServices
  interface InjectedServices { }
}

export interface SmartRegistry<TTypes> {
  values(): TTypes[keyof TTypes][];
  register<TKey extends keyof TTypes, TArgs extends [TKey, ...any[]]>(...args: TArgs): (ctor: {
    new(...args: TArgs): TTypes[TKey]
  }) => void;
  has<TKey extends keyof TTypes>(key: TKey): boolean
  get<TKey extends keyof TTypes>(key: TKey): TTypes[TKey];
  bind<TKey extends keyof TTypes>(key: TKey): () => TTypes[TKey]
}
export function mkSmartRegistry<TTypes>(): SmartRegistry<TTypes> {

  const registrar: PartialRecord<keyof TTypes, TTypes[keyof TTypes]> = {};

  return {
    values() {
      return Object.values(registrar);
    },
    register<TKey extends keyof TTypes, TArgs extends [TKey, ...any[]]>(...args: TArgs) {
      const [key] = args;

      return (ctor: { new(...args: TArgs): TTypes[TKey] }) => {
        registrar[key] = new ctor(...args);
      }
    },
    has(key) {
      return hasValue(registrar, key)
    },
    get<TKey extends keyof TTypes>(key: TKey) {
      return getValueOrThrow(registrar, key, `Expected key (${key as string}) to have a handler.`) as TTypes[TKey]
    },
    bind<TKey extends keyof TTypes>(key: TKey) {
      return () => getValueOrThrow(registrar, key, `Expected key (${key as string}) to have a handler.`) as TTypes[TKey]
    }
  }
}
