export type AppendToObject<T, U extends keyof any, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

/**
 * Appends a new Key/Value to an existing dictionary <T>
 */
export type AppendToDictionary<TDict, TKey extends string, TValue> = {
  [K in keyof TDict | TKey]: K extends keyof TDict ? TDict[K] : TValue;
};
