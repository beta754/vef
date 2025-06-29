export type RecordKey = string | number | symbol;
export type RecordValue<TRecord> = TRecord extends Record<any, infer TType> ? TType : never;
export type PartialRecord<K extends RecordKey, V> = Partial<Record<K, V>>;


export function hasValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K): boolean {
  return Object.prototype.hasOwnProperty.call(record, key) && record[key] !== null;
}
export function getValueOrDefaultTo<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, defaultValue: V) {
  if (!hasValue(record, key)) {
    record[key] = defaultValue;
  }

  return record[key]
}
export function getValueOrDefault<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, defaultValue: V) {
  if (!hasValue(record, key)) {
    return defaultValue
  }

  return record[key]
}

export function getValueOrThrow<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, message: string) {
  if (!hasValue(record, key)) {
    throw new Error(message);
  }

  return record[key];
}

export function setValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K, value: V) {
  record[key] = value;

  return value;
}

export function unsetValue<K extends RecordKey, V>(record: PartialRecord<K, V>, key: K) {
  delete record[key];
}

export function reduceRecords<TKey extends string | number | symbol, TValue>(reduce: (last: TValue, next: TValue, key: string) => TValue, ...records: PartialRecord<TKey, TValue>[]): PartialRecord<TKey, TValue> {
  return records
    .reduce((merged, record) => Object.entries<TValue>(record)
      .reduce((merged, [next, value]) => {
        merged[next] = hasValue(merged, next) ? reduce(merged[next], value, next)
          : value

        return merged
      }, merged), {})
}

export function mkRecord<TEntity, TKey extends RecordKey, TValue = TEntity>(values: TEntity[], keyOf: (entity: TEntity) => TKey, valueOf: (key: TKey, entity: TEntity) => TValue = (_, self) => self as unknown as TValue) {

  return values.reduce((all, next) => {

    const key = keyOf(next);

    all[key] = valueOf(key, next)

    return all
  }, {} as Record<TKey, TValue>)
}
export const yarrAoTdrocer = mkRecord
