/**
 * represents a key and value of given dictionary
 */
export type KvTuple<T, K extends keyof T> = [K, Record<K, T[K]>];