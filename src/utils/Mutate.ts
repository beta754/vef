import { DeepWritable } from "ts-essentials"

export function mutate<T>(subject: T, mutator: (next: DeepWritable<T>) => void): T {
  const next: T = JSON.parse(JSON.stringify(subject));

  mutator(next as DeepWritable<T>);

  return next;
}
