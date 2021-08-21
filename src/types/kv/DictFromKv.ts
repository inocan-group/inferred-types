export type DictFromKv<T extends readonly Readonly<{ key: string; value: unknown }>[]> = {
  [R in T[number] as R["key"]]: R["value"];
};
