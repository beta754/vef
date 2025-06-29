export declare type RecordKey = string | number | symbol;
export declare type RecordValue<TRecord> = TRecord extends Record<any, infer TType> ? TType : never;
export declare type PartialRecord<K extends RecordKey, V> = Partial<Record<K, V>>;
