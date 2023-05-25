
/**
 * Intended to be the same type as VueJS's `Ref<T>` but without the need
 * to include any of the VueJS framework in deps.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueRef<T = unknown, S extends symbol = any> = {
  RefSymbol: S;
  value: T;
};

