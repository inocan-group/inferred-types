export type DictFromKv<T extends { key: string; value: unknown }[]> =
  { [R in T[number]as R["key"]]: R["value"] };