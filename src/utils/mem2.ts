import { clear } from "mem"
import mem = require("mem")

export interface Mem2Options<TKey, TArgs extends any[]> {
  maxAge?: number
  cacheKey?: (args: TArgs) => TKey
}
export const mem2 = function <TArgs extends any[], TReturn, TKey = string>(fn: (...args: TArgs) => TReturn, options: Mem2Options<TKey, TArgs> = {}): (...args: TArgs) => TReturn extends Promise<infer U> ? Promise<U> : TReturn {
  const wrapped = mem((...args: TArgs) => {
    const res: TReturn = fn(...args)

    return !(res instanceof Promise) ? res
      : res.catch(err => {
        clear(wrapped)
        throw err
      }) as Promise<TReturn>

  }, options)

  return wrapped as (...args: TArgs) => TReturn extends Promise<infer U> ? Promise<U> : TReturn
}
