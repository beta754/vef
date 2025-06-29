import { AsyncOrSync } from "ts-essentials"

export namespace Async {
  export function parallel<TElement, TResult = void>(elements: TElement[], map: (element: TElement) => AsyncOrSync<TResult>): Promise<TResult[]> {
    return Promise.all(elements.map(async element => map(element)))
  }

  export function sequential<TElement, TResult = void>(elements: TElement[], map: (element: TElement) => AsyncOrSync<TResult>) {
    return elements.reduce(async (last, next) => {
      const results = await last

      results.push(await map(next));

      return results
    }, Promise.resolve(Array.of<TResult>()))
  }
}
