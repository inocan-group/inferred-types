export type KvDict<T extends {} = {}, K extends keyof T = keyof T> = {
  key: K;
  value: T[K];
};

export type KvTuple<K extends Readonly<string>, V extends any> = [K, V];